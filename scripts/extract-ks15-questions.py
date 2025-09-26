import json
import re

def extract_ks15_questions():
    with open('reference/parsed-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    print("📝 KS-15 실제 15개 질문 추출\n")

    set_data = data['ks15_set.dbf']['data']

    # 질문별로 그룹화
    questions_by_num = {}

    for record in set_data:
        question_num = record['field_0']  # 설문1, 설문2, ... 설문15
        option_key = record['field_2']    # A, B, C 등
        option_text = record['field_6']   # 실제 선택지 텍스트

        if question_num not in questions_by_num:
            questions_by_num[question_num] = {
                'question_number': question_num,
                'options': []
            }

        if option_text and option_text.strip():
            questions_by_num[question_num]['options'].append({
                'key': option_key,
                'text': option_text.strip()
            })

    # 정렬된 질문들
    sorted_questions = sorted(questions_by_num.items())

    print("=== 추출된 KS-15 표준 질문들 ===\n")

    extracted_questions = []

    for q_num, q_data in sorted_questions:
        print(f"설문{q_num}:")

        # 선택지들을 보고 질문 제목 추론
        options = q_data['options']

        if not options:
            continue

        # 첫 번째 옵션을 보고 질문 카테고리 추론
        first_option = options[0]['text']

        question_title = ""
        category = ""

        # 패턴 기반으로 질문 제목과 카테고리 추론
        if "대범" in first_option or "섬세" in first_option:
            question_title = "성격이 어떤 편입니까?"
            category = "personality"
        elif "적극적" in first_option or "소극적" in first_option:
            question_title = "행동이나 일 처리는 어떤 편입니까?"
            category = "behavior"
        elif "외향적" in first_option or "내성적" in first_option:
            question_title = "성격이 외향적/내성적 중 어느 쪽입니까?"
            category = "personality"
        elif "남성적" in first_option or "여성적" in first_option:
            question_title = "성향이 남성적/여성적 중 어느 쪽입니까?"
            category = "gender_tendency"
        elif "감정적" in first_option or "이성적" in first_option:
            question_title = "감정과 이성 중 어느 쪽이 우세합니까?"
            category = "emotion"
        elif "소화" in first_option:
            question_title = "소화는 어떤 편입니까?"
            category = "digestion"
        elif "입맛" in first_option or "식욕" in first_option:
            question_title = "식욕이나 입맛은 어떻습니까?"
            category = "appetite"
        elif "땀" in first_option:
            question_title = "땀은 어느 정도 납니까?"
            category = "sweat"
        elif "차가운" in first_option or "따뜻한" in first_option:
            question_title = "차가운 것과 따뜻한 것 중 어느 것을 좋아합니까?"
            category = "temperature_preference"
        elif "기분" in first_option or "우울" in first_option:
            question_title = "평소 기분은 어떻습니까?"
            category = "mood"
        elif "힘들다" in first_option or "힘들지" in first_option:
            question_title = "일이 힘들 때 어떻게 반응합니까?"
            category = "stress_response"
        elif "소변" in first_option:
            question_title = "소변은 어떻습니까?"
            category = "urination"
        elif "적응" in first_option:
            question_title = "새로운 환경에 적응하는 것은?"
            category = "adaptation"
        elif "음용수" in first_option or "물" in first_option:
            question_title = "평소 물(음용수)은 어떻게 드십니까?"
            category = "water_intake"
        elif "온도" in first_option or "날씨" in first_option:
            question_title = "선호하는 온도나 날씨는?"
            category = "weather_preference"
        else:
            question_title = f"질문 {q_num}"
            category = "other"

        print(f"  제목: {question_title}")
        print(f"  카테고리: {category}")
        print("  선택지:")

        formatted_options = []
        for i, opt in enumerate(options):
            print(f"    {opt['key']}) {opt['text']}")
            formatted_options.append({
                'id': opt['key'].lower(),
                'text': opt['text']
            })

        extracted_questions.append({
            'id': q_num,
            'question': question_title,
            'category': category,
            'options': formatted_options
        })

        print()

    print(f"총 {len(extracted_questions)}개 질문 추출 완료!")

    # TypeScript 파일로 출력
    print("\n=== TypeScript 형태로 변환 ===")

    ts_content = f"""// KS-15 표준 질문 (실제 DBF 데이터에서 추출)
export interface KS15Question {{
  id: number;
  question: string;
  category: string;
  options: {{
    id: string;
    text: string;
  }}[];
}}

export const ks15Questions: KS15Question[] = [
"""

    for q in extracted_questions:
        ts_content += f"""  {{
    id: {q['id']},
    question: "{q['question']}",
    category: "{q['category']}",
    options: [
"""
        for opt in q['options']:
            ts_content += f"""      {{ id: "{opt['id']}", text: "{opt['text']}" }},
"""
        ts_content += """    ],
  },
"""

    ts_content += """];

export default ks15Questions;
"""

    print("TypeScript 코드 생성 완료!")

    return extracted_questions, ts_content

if __name__ == "__main__":
    questions, ts_code = extract_ks15_questions()

    # TypeScript 파일로 저장
    with open('src/data/ks15-questions-extracted.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)

    print("\n✅ src/data/ks15-questions-extracted.ts 파일로 저장완료!")