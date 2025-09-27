# Korean Medicine Constitution Test - Project Overview

## Purpose
A Next.js-based web application for Korean traditional medicine (사상의학) constitution diagnosis. The app implements **dual diagnosis systems** to accommodate different user needs and medical accuracy requirements.

## Key Features
- **Dual Constitution Diagnosis Systems**:
  1. **Original/Legacy System** (`/` route): Simplified 10-question test with 4 constitutions (태양인, 태음인, 소양인, 소음인)
  2. **KS-15 Medical System** (`/medical-test` route): Medical-grade 12-question test based on actual DBF medical data, 3 constitutions only (태음인, 소양인, 소음인)

- **Progressive Web App (PWA)**: Installable, offline support, service worker
- **Responsive Design**: Mobile-first, touch-optimized with swipe navigation
- **Dark Mode**: System theme detection + manual toggle
- **Result Management**: Local storage, sharing (social media, clipboard, download), history tracking
- **Medical Data Integration**: Real DBF file processing, gender-specific weighting, BMI/age adjustments

## Architecture Highlights
- **Type Safety**: Comprehensive TypeScript definitions supporting both 4-constitution legacy and 3-constitution KS-15 systems
- **State Management**: Custom React hooks for each diagnosis system
- **Medical Validation**: Python scripts for DBF data processing and medical accuracy validation
- **Dual System Compatibility**: Backward-compatible interfaces between legacy and medical systems

## Critical Understanding
The KS-15 system represents actual medical standards and excludes 태양인 diagnosis (only 태음인, 소양인, 소음인). This is based on real medical research data from DBF files, not arbitrary design choices.