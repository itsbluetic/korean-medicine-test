# Codebase Architecture

## High-Level Structure

### Core Directories
```
src/
├── app/                 # Next.js 15 App Router pages
│   ├── page.tsx        # Landing page with dual test options
│   ├── medical-test/   # KS-15 medical system route
│   └── layout.tsx      # PWA config, metadata, global layout
├── components/         # Reusable UI components
├── data/              # Static data and question databases
├── hooks/             # Custom React hooks for state management
├── lib/               # Core algorithms and utilities
└── types/             # TypeScript type definitions
```

## Dual System Architecture

### 1. Original/Legacy System
- **Questions**: `src/data/questions.ts` (10 questions, 4-constitution weights)
- **Algorithm**: `src/lib/diagnosis.ts` (simple weighted scoring)
- **State**: `src/hooks/useConstitutionTest.ts`
- **Types**: `LegacyConstitutionType`, `LegacyTestResult`

### 2. KS-15 Medical System
- **Questions**: `src/data/ks15-questions.ts` (12 questions, medical data derived)
- **Algorithm**: `src/lib/ks15-diagnosis.ts` (complex gender-specific, BMI/age adjusted)
- **State**: `src/hooks/useKS15Test.ts`
- **Types**: `ConstitutionType`, `DiagnosisResult`
- **Weight Matrix**: `src/data/ks15-weight-matrix.ts` (from DBF medical data)

## Key Architectural Patterns

### State Management
Each diagnosis system has its own dedicated hook:
- `useConstitutionTest` - Legacy 4-constitution system
- `useKS15Test` - Medical 3-constitution system
- `useTestHistory` - Result persistence (localStorage)
- `useTheme` - Dark mode with system detection
- `useSwipe` - Touch navigation support

### Type Safety Strategy
- **Backward Compatibility**: `LegacyTestResult` and `TestResult` interfaces
- **Union Types**: Components handle both result types seamlessly
- **Medical Data Integrity**: Strict typing for DBF-derived data structures

### Component Architecture
- **Universal Components**: `Question`, `TestResult` handle both systems
- **System-Specific**: Route-based separation (`/` vs `/medical-test`)
- **Progressive Enhancement**: Core functionality works without JavaScript

### Medical Data Processing Pipeline
1. **DBF Files** (`reference/` directory) - Raw medical research data
2. **Python Scripts** (`scripts/`) - Data extraction and validation
3. **Generated TS Files** (`src/data/`) - Type-safe medical algorithms
4. **Validation Scripts** - Ensure medical accuracy and standard compliance

## Critical Design Decisions

### Why Dual Systems?
- **Legacy System**: Fast, demo-friendly, 4 constitutions
- **KS-15 System**: Medical accuracy, research-based, 3 constitutions only
- **User Choice**: Different complexity levels for different needs

### Medical Data Integrity
- KS-15 weights derived from actual medical DBF files
- Gender-specific algorithms reflect real medical practice
- 3-constitution limit matches medical research (태양인 excluded)
- Validation scripts ensure consistency with medical standards

### PWA and Performance
- Service worker for offline functionality
- Code splitting by route
- Optimized bundle sizes
- Cached medical data for performance