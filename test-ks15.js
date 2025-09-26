// KS-15 시스템 테스트 스크립트
const { diagnoseKS15Constitution } = require('./src/lib/ks15-diagnosis');

// 테스트 데이터
const testData = {
  answers: {
    1: 'broad',       // 성격(대범/섬세) - 대범
    2: 'fast',        // 행동(빠름/느림) - 빠름
    3: 'active',      // 일(적극/소극) - 적극적
    4: 'extrovert',   // 성격(외향/내성) - 외향
    5: 'masculine',   // 성향(남성/여성) - 남성적
    6: 'rational',    // 감정(흥분/이성) - 이성
    7: 'good',        // 소화 - 잘됨
    8: 'good',        // 입맛 - 좋음
    9: 'much',        // 땀 - 많이
    10: 'refreshed',  // 땀후기분 - 상쾌
    11: 'never',      // 대변참기힘듬 - 없음
    12: 'none',       // 밤소변 - 0회
    13: 'heat',       // 온도반응 - 더위싫음
    14: 'cold'        // 음용수 - 냉수
  },
  height: 175,
  weight: 70,
  gender: 'male',
  age: 30
};

console.log('KS-15 체질 진단 테스트 시작...\n');

try {
  const result = diagnoseKS15Constitution(testData);

  console.log('=== 진단 결과 ===');
  console.log(`체질: ${result.details.koreanName} (${result.constitution})`);
  console.log(`신뢰도: ${result.confidence}%`);
  console.log(`BMI: ${result.bmi}`);
  console.log('\n=== 점수 분포 ===');
  Object.entries(result.scores).forEach(([type, score]) => {
    console.log(`${type}: ${score}점`);
  });

  console.log('\n=== 분석 결과 ===');
  result.analysis.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });

  console.log('\n=== 체질 특성 ===');
  console.log(result.details.description);

  console.log('\n테스트 성공! 🎉');
} catch (error) {
  console.error('테스트 실패:', error.message);
}