import json

def build_weight_matrix():
    with open('reference/parsed-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    print("🔢 성별별 가중치 매트릭스 구축\n")

    wt_data = data['k_15_wt.DBF']['data']

    # 질문별 가중치 매트릭스 구축
    weight_matrix = {}
    current_question = None
    question_id = 0

    for record in wt_data:
        field_0 = record['field_0'].strip()

        # 질문 제목 감지
        if (field_0.endswith('.성격') or field_0.endswith('.행동') or
            field_0.endswith('.일') or field_0.endswith('.소화') or
            field_0.endswith('.입맛') or field_0.endswith('.땀') or
            field_0.endswith('기분') or field_0.endswith('힘듬') or
            field_0.endswith('소변') or field_0.endswith('적응') or
            field_0.endswith('.음용수') or '온도' in field_0):

            if field_0 not in ['', ' ']:
                question_id += 1
                current_question = question_id
                weight_matrix[current_question] = {
                    'title': field_0,
                    'options': {}
                }
                print(f"질문 {question_id}: {field_0}")
                continue

        # 답변 옵션 감지
        if current_question and field_0.startswith('(') and ')' in field_0:
            option_key = field_0

            # 가중치 추출 - 3개 체질만 (태음, 소양, 소음)
            m_weights = [
                float(record['M_1'].strip()) if record['M_1'].strip() else 0.0,
                float(record['M_2'].strip()) if record['M_2'].strip() else 0.0,
                float(record['M_3'].strip()) if record['M_3'].strip() else 0.0
            ]
            f_weights = [
                float(record['F_1'].strip()) if record['F_1'].strip() else 0.0,
                float(record['F_2'].strip()) if record['F_2'].strip() else 0.0,
                float(record['F_3'].strip()) if record['F_3'].strip() else 0.0
            ]

            weight_matrix[current_question]['options'][option_key] = {
                'male': m_weights,
                'female': f_weights,
                'is_default': record.get('field_9') == '*'
            }

            print(f"  {option_key}: M{m_weights}, F{f_weights}" + (" ⭐" if record.get('field_9') == '*' else ""))

    print(f"\n총 {len(weight_matrix)}개 질문의 가중치 매트릭스 구축 완료!")

    # TypeScript 형태로 출력
    print("\n=== TypeScript 가중치 매트릭스 ===")

    ts_content = """// KS-15 가중치 매트릭스 (3체질: 태음인, 소양인, 소음인)
export interface WeightMatrix {
  [questionId: number]: {
    [optionKey: string]: {
      male: [number, number, number];  // [태음인, 소양인, 소음인]
      female: [number, number, number];
      is_default?: boolean;
    };
  };
}

export const ks15WeightMatrix: WeightMatrix = {
"""

    for q_id, q_data in weight_matrix.items():
        ts_content += f"""  {q_id}: {{ // {q_data['title']}\n"""

        for opt_key, opt_data in q_data['options'].items():
            default_str = ", is_default: true" if opt_data.get('is_default') else ""
            ts_content += f"""    "{opt_key}": {{ male: {opt_data['male']}, female: {opt_data['female']}{default_str} }},\n"""

        ts_content += """  },\n"""

    ts_content += """};\n\n"""

    # 체질 이름 매핑도 추가
    ts_content += """// 체질 매핑 (KS-15는 3체질 시스템)
export const constitutionNames = {
  0: 'taeumin',      // 태음인 (M_1, F_1)
  1: 'soyangin',     // 소양인 (M_2, F_2)
  2: 'soeumin',      // 소음인 (M_3, F_3)
} as const;

export const constitutionKoreanNames = {
  taeumin: '태음인',
  soyangin: '소양인',
  soeumin: '소음인',
} as const;

export type ConstitutionType = keyof typeof constitutionKoreanNames;
"""

    print("TypeScript 매트릭스 생성 완료!")
    return weight_matrix, ts_content

if __name__ == "__main__":
    matrix, ts_code = build_weight_matrix()

    # TypeScript 파일로 저장
    with open('src/data/ks15-weight-matrix.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)

    print("\n✅ src/data/ks15-weight-matrix.ts 파일로 저장완료!")

    # 통계 정보 출력
    print(f"\n📊 통계:")
    total_options = sum(len(q['options']) for q in matrix.values())
    default_options = sum(1 for q in matrix.values() for opt in q['options'].values() if opt.get('is_default'))
    print(f"- 총 질문 수: {len(matrix)}개")
    print(f"- 총 선택지 수: {total_options}개")
    print(f"- 기본값 선택지: {default_options}개")