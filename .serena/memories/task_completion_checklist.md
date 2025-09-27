# Task Completion Checklist

## After Any Code Changes

### Code Quality (Required)
- [ ] `npm run lint` - Must pass without errors
- [ ] `npm run format:check` - Code must be properly formatted
- [ ] `npm run build` - Production build must succeed

### Medical System Changes (KS-15 Related)
If modifying anything related to the KS-15 medical system:
- [ ] `python3 scripts/analyze-weight-mapping.py` - Validate constitution mapping
- [ ] `node scripts/test-corrected-ks15.mjs` - Test KS-15 functionality
- [ ] `node scripts/validate-ks15-standard.mjs` - Ensure medical standard compliance

### Type Safety Verification
- [ ] Check TypeScript compilation with no errors
- [ ] Verify both legacy and KS-15 systems maintain compatibility
- [ ] Test interfaces between dual diagnosis systems

### Testing Checklist
- [ ] Manual test both diagnosis systems (`/` and `/medical-test`)
- [ ] Verify PWA functionality (offline, installable)
- [ ] Test responsive design on mobile/desktop
- [ ] Validate dark mode toggle works correctly
- [ ] Check result sharing and history features

### Before Git Commit
- [ ] All linting passes
- [ ] All formatting is correct
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] Medical validation scripts pass (if applicable)

### Deployment Preparation
- [ ] Production build test: `npm run build && npm start`
- [ ] Verify both routes work in production mode
- [ ] Test PWA features in production environment
- [ ] Validate medical data integrity

## Important Notes
- **Never commit medical data changes without validation scripts passing**
- **Both diagnosis systems must remain functional after any changes**
- **Maintain backward compatibility for stored test results**
- **PWA functionality requires HTTPS in production**