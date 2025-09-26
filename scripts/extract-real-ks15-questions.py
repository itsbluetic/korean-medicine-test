import json

def extract_real_ks15_questions():
    with open('reference/parsed-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    print("📝 k_15_wt.dbf에서 실제 KS-15 질문 추출\n")

    wt_data = data['k_15_wt.DBF']['data']

    # 질문과 선택지 추출
    questions = {}
    current_question = None
    question_counter = 1

    print("=== 질문 및 선택지 패턴 분석 ===\n")

    for record in wt_data:
        field_0 = record['field_0'].strip()

        # 질문 제목 감지 (끝에 특정 단어가 있는 경우)
        if (field_0.endswith('.성격') or field_0.endswith('.행동') or
            field_0.endswith('.일') or field_0.endswith('.소화') or
            field_0.endswith('.입맛') or field_0.endswith('.땀') or
            field_0.endswith('기분') or field_0.endswith('힘듬') or
            field_0.endswith('소변') or field_0.endswith('적응') or
            field_0.endswith('.음용수') or '온도' in field_0):

            if field_0 not in ['', ' ']:
                current_question = field_0
                questions[current_question] = {
                    'id': question_counter,
                    'title': field_0,
                    'options': []
                }
                question_counter += 1
                print(f"질문 {questions[current_question]['id']}: {current_question}")
                continue

        # 답변 옵션 감지 (괄호로 시작하는 경우)
        if current_question and field_0.startswith('(') and ')' in field_0:
            option_text = field_0

            # 가중치 확인 (0이 아닌 값이 있는지)
            m_weights = [record['M_1'], record['M_2'], record['M_3'], record['M_4']]
            f_weights = [record['F_1'], record['F_2'], record['F_3'], record['F_4']]

            # 빈 문자열을 0으로 변환
            m_weights = [float(w.strip()) if w.strip() else 0.0 for w in m_weights]
            f_weights = [float(w.strip()) if w.strip() else 0.0 for w in f_weights]

            questions[current_question]['options'].append({
                'text': option_text,
                'male_weights': m_weights,
                'female_weights': f_weights,
                'is_default': record.get('field_9') == '*'
            })
            print(f"  → {option_text}")

    print(f"\n총 {len(questions)}개 질문 추출 완료!")

    # 실제 의학적 질문으로 변환
    converted_questions = []

    for q_title, q_data in questions.items():
        # 질문 제목을 의학적 질문으로 변환
        question_text = ""
        category = ""

        if "성격" in q_title:
            question_text = "당신의 성격은 어떻습니까?"
            category = "personality"
        elif "행동" in q_title:
            question_text = "행동이나 일 처리는 어떤 편입니까?"
            category = "behavior"
        elif "소화" in q_title:
            question_text = "소화는 어떤 편입니까?"
            category = "digestion"
        elif "입맛" in q_title:
            question_text = "평소 입맛은 어떻습니까?"
            category = "appetite"
        elif "땀" in q_title:
            question_text = "땀은 어느 정도 납니까?"
            category = "sweat"
        elif "기분" in q_title:
            question_text = "평소 기분은 어떻습니까?"
            category = "mood"
        elif "힘듬" in q_title:
            question_text = "일이 힘들 때 어떻게 반응합니까?"
            category = "stress_response"
        elif "소변" in q_title:
            question_text = "소변 상태는 어떻습니까?"
            category = "urination"
        elif "적응" in q_title:
            question_text = "새로운 환경에 적응하는 것은?"
            category = "adaptation"
        elif "음용수" in q_title:
            question_text = "평소 물은 어떻게 드십니까?"
            category = "water_intake"
        elif "온도" in q_title:
            question_text = "선호하는 온도는?"
            category = "temperature_preference"
        else:
            question_text = q_title.replace('.', ' ')
            category = "other"

        # 선택지 정리 - 괄호 제거하고 깔끔하게
        clean_options = []
        for i, opt in enumerate(q_data['options']):
            # 괄호 제거하고 선택지 텍스트만 추출
            clean_text = opt['text']
            if clean_text.startswith('(') and ')' in clean_text:
                clean_text = clean_text[clean_text.find(')')+1:].strip()

            clean_options.append({
                'id': chr(ord('a') + i),  # a, b, c, d...
                'text': clean_text,
                'weights': {
                    'male': opt['male_weights'][:3],  # 3개만 (태음, 소양, 소음)
                    'female': opt['female_weights'][:3]
                },
                'is_default': opt['is_default']
            })

        converted_questions.append({
            'id': q_data['id'],
            'question': question_text,
            'category': category,
            'original_title': q_title,
            'options': clean_options
        })

    # TypeScript 파일 생성
    ts_content = """// KS-15 실제 질문 (k_15_wt.dbf에서 추출)
export interface KS15Question {
  id: number;
  question: string;
  category: string;
  options: {
    id: string;
    text: string;
    weights?: {
      male: number[];
      female: number[];
    };
    is_default?: boolean;
  }[];
}

export const ks15Questions: KS15Question[] = [
"""

    for q in converted_questions:
        ts_content += f"""  {{
    id: {q['id']},
    question: "{q['question']}",
    category: "{q['category']}",
    options: [
"""
        for opt in q['options']:
            weights_str = f"{{ male: {opt['weights']['male']}, female: {opt['weights']['female']} }}"
            default_str = f", is_default: {str(opt['is_default']).lower()}" if opt['is_default'] else ""
            ts_content += f"""      {{ id: "{opt['id']}", text: "{opt['text']}", weights: {weights_str}{default_str} }},
"""
        ts_content += """    ],
  },
"""

    ts_content += """];

export default ks15Questions;
"""

    print("\n=== 변환된 질문들 ===")
    for q in converted_questions:
        print(f"{q['id']}. {q['question']} ({q['category']})")
        for opt in q['options']:
            default_mark = " ⭐" if opt.get('is_default') else ""
            print(f"   {opt['id']}) {opt['text']}{default_mark}")
        print()

    return converted_questions, ts_content

if __name__ == "__main__":
    questions, ts_code = extract_real_ks15_questions()

    # TypeScript 파일로 저장
    with open('src/data/ks15-questions-real.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)

    print("✅ src/data/ks15-questions-real.ts 파일로 저장완료!")