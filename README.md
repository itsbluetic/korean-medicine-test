# 한의학적 체질 진단 테스트

Next.js 기반의 사상의학 체질 진단 웹 애플리케이션입니다. 문답형 테스트를 통해 태양인, 태음인, 소양인, 소음인 중 자신의 체질을 진단할 수 있습니다.

## 🌐 라이브 데모

**🚀 [지금 바로 테스트하기](https://korean-medicine-test-1ks5cc8l1-sangwan-ans-projects.vercel.app)**

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square&logo=github)](https://github.com/itsbluetic/korean-medicine-test)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-green?style=flat-square&logo=vercel)](https://korean-medicine-test-1ks5cc8l1-sangwan-ans-projects.vercel.app)

## 🎯 프로젝트 개요

- **사상의학 기반**: 전통 한의학의 사상체질 이론 적용
- **체질 분류**: 태양인, 태음인, 소양인, 소음인
- **문답형 테스트**: 체형, 성격, 소화, 수면, 감정 등 다양한 영역의 질문
- **맞춤형 결과**: 체질별 특성과 건강 관리법 제공

## ✨ 주요 기능

### 🌟 **사용자 경험**
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- 🌙 **다크모드**: 시스템 테마 자동 감지 및 수동 전환
- 👆 **터치 친화적**: 스와이프 네비게이션, 터치 최적화 UI
- ♿ **접근성**: ARIA 속성, 키보드 네비게이션, 스크린 리더 지원

### 🚀 **고급 기능**
- 📊 **결과 저장**: 로컬스토리지에 테스트 히스토리 저장 (최대 10개)
- 🔗 **공유 기능**: 소셜 미디어 공유, 클립보드 복사, 파일 다운로드
- 📱 **PWA 지원**: 홈 화면 설치, 오프라인 사용 가능
- ⚡ **성능 최적화**: 캐싱, 코드 분할, 최적화된 번들 크기

### 🎨 **인터페이스**
- 🎯 **직관적 UI**: 단계별 안내, 진행률 표시, 명확한 피드백
- 🔄 **부드러운 애니메이션**: 페이지 전환, 버튼 상호작용 효과
- 📐 **일관된 디자인**: 통일된 컴포넌트, 색상 시스템

## 🏗️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **PWA**: next-pwa (Service Worker, 오프라인 지원)
- **Development**: ESLint, Prettier
- **Tools**: Turbopack (개발 서버)
- **Deployment**: Vercel

## 🚀 시작하기

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 사용 가능한 스크립트

```bash
# 개발 서버 실행 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린팅
npm run lint

# 코드 포맷팅
npm run format

# 코드 포맷팅 검사
npm run format:check
```

## 📁 프로젝트 구조

```
src/
├── app/                 # Next.js App Router 페이지
├── components/          # 재사용 가능한 컴포넌트
├── data/               # 정적 데이터 (질문, 체질 정보)
├── hooks/              # 커스텀 React 훅
├── lib/                # 유틸리티 함수 (진단 알고리즘 등)
└── types/              # TypeScript 타입 정의
```

## 🔬 체질 진단 알고리즘

### 진단 과정

1. **질문 응답**: 10개 질문에 4지선다로 응답
2. **점수 계산**: 각 답변의 체질별 가중치를 합산
3. **체질 판정**: 최고 점수의 체질로 결정
4. **신뢰도 계산**: 점수 분포 기반 결과 신뢰도 산출

### 질문 카테고리

- 체형 (physique): 신체적 특징
- 성격 (personality): 성격과 행동 패턴
- 소화 (digestion): 소화 기능과 식습관
- 수면 (sleep): 수면 패턴
- 감정 (emotion): 감정 표현과 조절
- 체온 (temperature): 체온 조절과 온도 선호
- 행동 (behavior): 일상 행동 패턴

## 🧪 테스트

### 단위 테스트

```bash
# Jest를 사용한 단위 테스트 (추후 추가 예정)
npm run test

# 테스트 커버리지 확인
npm run test:coverage
```

### E2E 테스트

```bash
# Cypress를 사용한 E2E 테스트 (추후 추가 예정)
npm run test:e2e
```

## 🤝 협업 가이드

### Git 워크플로우

- `main`: 프로덕션 배포용 브랜치
- `develop`: 개발 통합 브랜치
- `feature/*`: 기능 개발 브랜치
- `bugfix/*`: 버그 수정 브랜치

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 코드 작성
chore: 빌드 업무, 패키지 매니저 설정 등
```

## 📋 개발 로드맵

### 이터레이션 1 ✅

- [x] 프로젝트 초기 설정
- [x] 기본 타입 정의
- [x] 질문 데이터베이스 구성
- [x] 진단 알고리즘 구현

### 이터레이션 2 ✅ (완료)

- [x] 기본 UI 컴포넌트 개발
- [x] 테스트 플로우 구현
- [x] 상태 관리 설정

### 이터레이션 3 ✅ (완료)

- [x] 결과 페이지 개발
- [x] 반응형 디자인 적용
- [x] 접근성 개선
- [x] 다크모드 지원
- [x] 모바일 최적화 및 터치 친화적 UI
- [x] 결과 저장 및 공유 기능
- [x] PWA 변환 (오프라인 지원)
- [x] Vercel 배포 준비

## 📄 라이선스

이 프로젝트는 MIT 라이선스하에 배포됩니다.
