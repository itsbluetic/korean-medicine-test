# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack (Next.js 15)
npm run dev

# Production build and start
npm run build
npm start

# Code quality
npm run lint
npm run format
npm run format:check

# Medical data analysis (Python scripts)
python3 scripts/parse_dbf.py              # Parse DBF medical files
python3 scripts/analyze-weight-mapping.py  # Analyze constitution mapping
node scripts/test-corrected-ks15.mjs      # Test KS-15 system
node scripts/validate-ks15-standard.mjs   # Validate against medical standard
```

## Architecture Overview

### Dual Diagnosis Systems

This application implements **two distinct constitution diagnosis systems**:

1. **Original System** (`/` route)
   - Simplified 10-question test
   - 4 constitutions: 태양인, 태음인, 소양인, 소음인
   - Uses `src/data/questions.ts` and `src/lib/diagnosis.ts`
   - Good for quick testing and demos

2. **KS-15 Medical System** (`/medical-test` route)
   - Medical-grade 12-question test based on actual DBF data
   - 3 constitutions only: 태음인, 소양인, 소음인 (excludes 태양인)
   - Uses `src/data/ks15-questions.ts` and `src/lib/ks15-diagnosis.ts`
   - Gender-specific weighting, BMI integration, age adjustments

### Medical Data Integration

**DBF Data Processing Pipeline:**
- `reference/` contains actual medical DBF files (k_15_wt.DBF, k_15_ss.DBF, etc.)
- `scripts/parse_dbf.py` extracts data into `reference/parsed-data.json`
- Analysis scripts validate 3-constitution mapping and weight matrices
- Generated TypeScript files in `src/data/` for type-safe medical algorithms

**Critical Understanding**: The KS-15 system was corrected from an initial 4-constitution implementation to a medically-accurate 3-constitution system after discovering that actual medical data excludes 태양인 diagnosis.

### Core Architecture

**State Management:**
- `src/hooks/useConstitutionTest.ts` - Original system state
- `src/hooks/useKS15Test.ts` - KS-15 system state
- `src/hooks/useTheme.ts` - Dark mode with system detection
- `src/hooks/useTestHistory.ts` - Result persistence (localStorage)
- `src/hooks/useSwipe.ts` - Touch navigation

**Diagnosis Algorithms:**
- Original: Simple weighted scoring across 4 constitutions
- KS-15: Complex gender-specific matrices, BMI/age adjustments, medical validation
- Both output `DiagnosisResult` with confidence scoring and detailed analysis

**Data Layer:**
- `src/data/questions.ts` - Original 10 questions with 4-constitution weights
- `src/data/ks15-questions.ts` - Medical 12 questions with 3-constitution weights
- `src/data/ks15-weight-matrix.ts` - Gender-specific weight matrices from DBF data
- `src/data/constitutions.ts` - Constitution characteristics and health advice
- `src/types/index.ts` - Comprehensive TypeScript definitions supporting both systems

### Component Architecture

**Pages:**
- `src/app/page.tsx` - Landing page with both test options
- `src/app/medical-test/page.tsx` - Medical KS-15 test flow with user info collection
- `src/app/layout.tsx` - PWA configuration, metadata, Tailwind setup

**Components:**
- `TestStart` - Original system entry point
- `Question` - Universal question display with swipe support
- `TestResult` - Results display with sharing, history, detailed analysis
- `ProgressBar` - Visual test progress
- `ThemeToggle` - Dark mode switcher
- `ShareButton` - Multi-platform sharing (social, clipboard, download)

### Medical Data Validation

The system includes extensive validation scripts ensuring medical accuracy:
- Constitution mapping matches traditional medicine theory
- Gender differences properly reflected in diagnosis
- Weight matrices produce clinically meaningful results
- 3-constitution system aligns with KS-15 standard (excluding 태양인)

### PWA Features

- Service worker for offline functionality
- Installable web app with proper manifests
- Result caching and history persistence
- Responsive design supporting all device sizes
- Touch-optimized interactions with swipe navigation

## Key Development Notes

**When working with diagnosis logic:**
- Always specify which system (original vs KS-15) you're modifying
- KS-15 system uses medical data - validate changes against DBF source
- Gender-specific weighting is critical for KS-15 accuracy
- Both systems should maintain backward compatibility in type interfaces

**When adding questions or weights:**
- Original system: Update `questions.ts` with 4-constitution weights
- KS-15 system: Must derive from medical DBF data, not arbitrary values
- Run validation scripts after any weight matrix changes

**Medical data is sacred** - the DBF files represent actual medical research data. Any changes to KS-15 weights should be validated against the source medical data using the provided analysis scripts.

## Recent Development History (Latest Session)

### Issues Resolved
1. **README Dual Links**: Updated to show both basic test and KS-15 medical test links separately
2. **TypeScript Build Errors**: Fixed type compatibility between legacy 4-constitution and KS-15 3-constitution systems
3. **Import Path Issues**: Converted relative imports to absolute @/ imports throughout codebase
4. **File Naming**: Cleaned up -corrected suffixes from file names
5. **Route Structure**: Changed from `/ks15-test` to `/medical-test` for better clarity

### Type System Improvements
- Added `LegacyTestResult` and `LegacyConstitutionType` interfaces for backward compatibility
- Updated `src/types/index.ts` with comprehensive type definitions supporting both systems
- Fixed percentage type casting issues in TestResult component

### Build System
- Successfully resolved all TypeScript errors and warnings
- Confirmed local development server works correctly for both systems
- Updated all import paths to use absolute @/ syntax

### Deployment Challenges
- Encountered persistent 404 errors on Vercel for KS-15 route despite local success
- Attempted multiple cache-busting strategies including file renaming and route changes
- Identified Vercel caching as potential blocker for complex file dependency chains

### Files Modified in Latest Session
- `README.md` - Updated with dual test links
- `src/data/ks15-questions-corrected.ts` → `src/data/ks15-questions.ts`
- `src/lib/ks15-diagnosis-corrected.ts` → `src/lib/ks15-diagnosis.ts`
- `src/app/ks15-test/page.tsx` → `src/app/medical-test/page.tsx`
- `src/types/index.ts` - Added legacy type interfaces
- `src/lib/diagnosis.ts` - Updated function signatures and import paths

### Next Steps Planned
- Create separate GitHub repository for KS-15 system to avoid Vercel deployment issues
- Deploy KS-15 to different domain for clean deployment environment
- Maintain main repository with basic 4-constitution system as stable deployment