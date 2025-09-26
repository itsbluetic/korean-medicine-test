import json

def analyze_weight_mapping():
    with open('reference/parsed-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    print("🔍 k_15_wt.dbf 가중치 매핑 정밀 분석\n")

    wt_data = data['k_15_wt.DBF']['data']

    # 체질 매핑을 위한 패턴 분석
    constitution_patterns = {}

    print("=== 각 질문별 답변 옵션과 가중치 ===")

    current_question = None
    for record in wt_data:
        field_0 = record['field_0'].strip()

        # 질문 제목 감지
        if field_0.endswith('.성격') or field_0.endswith('.행동') or field_0.endswith('.일') or field_0.endswith('.소화') or field_0.endswith('.입맛') or field_0.endswith('.땀') or field_0.endswith('기분') or field_0.endswith('힘듬') or field_0.endswith('소변') or field_0.endswith('적응') or field_0.endswith('.음용수') or '온도' in field_0:
            if field_0 not in ['', ' ']:
                current_question = field_0
                print(f"\n📋 {current_question}")
                constitution_patterns[current_question] = []
                continue

        # 답변 옵션과 가중치 데이터
        if current_question and field_0.startswith('(') and ')' in field_0:
            option_name = field_0
            m_weights = [record['M_1'], record['M_2'], record['M_3'], record['M_4']]
            f_weights = [record['F_1'], record['F_2'], record['F_3'], record['F_4']]

            # 빈 문자열을 0으로 변환
            m_weights = [float(w.strip()) if w.strip() else 0.0 for w in m_weights]
            f_weights = [float(w.strip()) if w.strip() else 0.0 for w in f_weights]

            print(f"  {option_name}:")
            print(f"    남성: {m_weights}")
            print(f"    여성: {f_weights}")

            if record.get('field_9') == '*':
                print(f"    ⭐ 기본값/중간값")

            constitution_patterns[current_question].append({
                'option': option_name,
                'male_weights': m_weights,
                'female_weights': f_weights,
                'is_default': record.get('field_9') == '*'
            })

    print("\n=== 체질 매핑 추정 ===")

    # 가중치 패턴 분석으로 체질 순서 추정
    print("가중치 패턴 분석:")

    # 대범한 성격 패턴 확인
    personality_data = constitution_patterns.get('2.성격', [])
    broad_option = next((opt for opt in personality_data if 'Broad' in opt['option']), None)

    if broad_option:
        m_weights = broad_option['male_weights']
        f_weights = broad_option['female_weights']
        print(f"대범한 성격 남성: {m_weights}")
        print(f"대범한 성격 여성: {f_weights}")

        # 가장 큰 양수와 가장 큰 음수 찾기
        max_pos_idx_m = m_weights.index(max([w for w in m_weights if w > 0] or [0]))
        max_neg_idx_m = m_weights.index(min([w for w in m_weights if w < 0] or [0]))

        print(f"남성 - 최대 양수 위치: {max_pos_idx_m}, 최대 음수 위치: {max_neg_idx_m}")

        # 사상의학 이론: 대범함 = 태양인 성향, 태음인과 반대
        print("\n🎯 체질 매핑 추정 (사상의학 이론 기반):")

        # 4개 위치 중 3개만 사용 (태양인 제외)
        non_zero_positions = [i for i in range(4) if any(
            abs(opt['male_weights'][i]) > 0.1 or abs(opt['female_weights'][i]) > 0.1
            for q_data in constitution_patterns.values()
            for opt in q_data
        )]

        print(f"실제 사용되는 위치: {non_zero_positions}")

        if len(non_zero_positions) == 3:
            print("✅ 3체질 시스템 확인!")
            print(f"위치 {non_zero_positions[0]}: 태음인 (가장 흔한 체질)")
            print(f"위치 {non_zero_positions[1]}: 소양인 (활발한 체질)")
            print(f"위치 {non_zero_positions[2]}: 소음인 (섬세한 체질)")
        else:
            print(f"사용되는 체질 수: {len(non_zero_positions)}")

    print("\n=== 성별별 가중치 차이 분석 ===")

    for question, options in constitution_patterns.items():
        if options:  # 데이터가 있는 질문만
            print(f"\n{question}:")
            for opt in options[:2]:  # 처음 2개 옵션만 표시
                m_weights = opt['male_weights']
                f_weights = opt['female_weights']

                # 남녀 차이가 큰 경우만 표시
                differences = [abs(m-f) for m, f in zip(m_weights, f_weights) if m != 0 or f != 0]
                if differences and max(differences) > 1.0:
                    print(f"  {opt['option']}: 남녀 가중치 차이 존재")

if __name__ == "__main__":
    analyze_weight_mapping()