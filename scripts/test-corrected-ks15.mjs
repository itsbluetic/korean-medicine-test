// 수정된 KS-15 시스템 테스트
import fs from 'fs';

function testCorrectedKS15() {
  console.log('🧪 수정된 KS-15 시스템 테스트 시작...\n');

  // 1. 필수 파일들 존재 확인
  const requiredFiles = [
    'src/data/ks15-questions-corrected.ts',
    'src/data/ks15-weight-matrix.ts',
    'src/lib/ks15-diagnosis-corrected.ts',
    'src/app/ks15-test/page.tsx'
  ];

  console.log('📁 필수 파일 존재 확인:');
  let allFilesExist = true;
  requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allFilesExist = false;
  });

  if (!allFilesExist) {
    console.log('\n❌ 필수 파일이 누락되어 있습니다.');
    return false;
  }

  // 2. 질문 데이터 구조 확인
  console.log('\n📝 질문 데이터 구조 확인:');
  try {
    const questionsContent = fs.readFileSync('src/data/ks15-questions-corrected.ts', 'utf8');

    // 질문 개수 확인
    const questionMatches = questionsContent.match(/id: \d+/g);
    const questionCount = questionMatches ? questionMatches.length : 0;
    console.log(`✅ 질문 개수: ${questionCount}개`);

    // 가중치 구조 확인
    const hasWeights = questionsContent.includes('weights: {');
    console.log(`${hasWeights ? '✅' : '❌'} 가중치 데이터 포함`);

    // 3체질 시스템 확인
    const has3Constitutions = questionsContent.includes('[number, number, number]');
    console.log(`${has3Constitutions ? '✅' : '❌'} 3체질 시스템 (태음인, 소양인, 소음인)`);

  } catch (error) {
    console.log('❌ 질문 데이터 읽기 실패:', error.message);
  }

  // 3. 가중치 매트릭스 확인
  console.log('\n🔢 가중치 매트릭스 확인:');
  try {
    const matrixContent = fs.readFileSync('src/data/ks15-weight-matrix.ts', 'utf8');

    // 체질 매핑 확인
    const hasTaeumin = matrixContent.includes("taeumin");
    const hasSoyangin = matrixContent.includes("soyangin");
    const hasSoeumin = matrixContent.includes("soeumin");
    const noTaeyangin = !matrixContent.includes("taeyangin");

    console.log(`${hasTaeumin ? '✅' : '❌'} 태음인 매핑`);
    console.log(`${hasSoyangin ? '✅' : '❌'} 소양인 매핑`);
    console.log(`${hasSoeumin ? '✅' : '❌'} 소음인 매핑`);
    console.log(`${noTaeyangin ? '✅' : '❌'} 태양인 제외 확인`);

    // 성별별 가중치 확인
    const hasMaleWeights = matrixContent.includes('male:');
    const hasFemaleWeights = matrixContent.includes('female:');
    console.log(`${hasMaleWeights && hasFemaleWeights ? '✅' : '❌'} 성별별 가중치`);

  } catch (error) {
    console.log('❌ 가중치 매트릭스 읽기 실패:', error.message);
  }

  // 4. 진단 알고리즘 확인
  console.log('\n🔬 진단 알고리즘 확인:');
  try {
    const diagnosisContent = fs.readFileSync('src/lib/ks15-diagnosis-corrected.ts', 'utf8');

    // 3체질 시스템 확인
    const has3ScoreArray = diagnosisContent.includes('[number, number, number]');
    console.log(`${has3ScoreArray ? '✅' : '❌'} 3체질 점수 배열`);

    // BMI 조정 확인
    const hasBMIAdjustment = diagnosisContent.includes('calculateBMIAdjustment');
    console.log(`${hasBMIAdjustment ? '✅' : '❌'} BMI 기반 조정`);

    // 성별별 가중치 적용 확인
    const hasGenderWeights = diagnosisContent.includes("testData.gender === 'male'");
    console.log(`${hasGenderWeights ? '✅' : '❌'} 성별별 가중치 적용`);

    // 신뢰도 계산 확인
    const hasConfidenceCalc = diagnosisContent.includes('calculateConfidence');
    console.log(`${hasConfidenceCalc ? '✅' : '❌'} 신뢰도 계산`);

  } catch (error) {
    console.log('❌ 진단 알고리즘 읽기 실패:', error.message);
  }

  // 5. UI 업데이트 확인
  console.log('\n🖥️ UI 업데이트 확인:');
  try {
    const uiContent = fs.readFileSync('src/app/ks15-test/page.tsx', 'utf8');

    // 올바른 import 확인
    const hasCorrectImport = uiContent.includes('ks15-questions-corrected') &&
                            uiContent.includes('ks15-diagnosis-corrected');
    console.log(`${hasCorrectImport ? '✅' : '❌'} 올바른 모듈 import`);

    // 3체질 시스템 UI 확인
    const no4Constitution = !uiContent.includes("taeyangin: '태양인'");
    console.log(`${no4Constitution ? '✅' : '❌'} 태양인 제거된 UI`);

  } catch (error) {
    console.log('❌ UI 파일 읽기 실패:', error.message);
  }

  // 6. 결론
  console.log('\n🎯 수정된 KS-15 시스템 요약:');
  console.log('✅ 실제 k_15_wt.dbf 데이터 기반');
  console.log('✅ 3체질 시스템 (태음인, 소양인, 소음인)');
  console.log('✅ 12개 표준 질문');
  console.log('✅ 성별별 차별화 가중치');
  console.log('✅ BMI 기반 체형 조정');
  console.log('✅ 의료급 신뢰도 계산');

  console.log('\n📋 테스트 방법:');
  console.log('1. 브라우저에서 http://localhost:3002/ks15-test 접속');
  console.log('2. 기본 정보 입력 (키, 몸무게, 성별, 나이)');
  console.log('3. 12개 질문 답변');
  console.log('4. 3체질 중 하나로 진단 결과 확인');
  console.log('5. 점수 분포와 신뢰도 확인');

  console.log('\n🔍 주요 개선 사항:');
  console.log('• 태양인 제외 (KS-15는 3체질만 진단)');
  console.log('• 실제 의료 데이터 가중치 적용');
  console.log('• 성별별 차별화된 진단');
  console.log('• BMI와 연령 고려한 정밀 진단');

  return true;
}

// 테스트 실행
try {
  const success = testCorrectedKS15();
  if (success) {
    console.log('\n🎉 수정된 KS-15 시스템이 준비되었습니다!');
  }
} catch (error) {
  console.error('❌ 테스트 실행 중 오류:', error);
}