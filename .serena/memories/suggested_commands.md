# Essential Development Commands

## Primary Development Commands

### Development Server
```bash
npm run dev  # Starts Next.js dev server with Turbopack
```

### Build and Production
```bash
npm run build  # Production build
npm start      # Start production server
```

### Code Quality (Run After Changes)
```bash
npm run lint         # ESLint checking
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
```

## Medical Data Processing (Python)

### DBF Data Analysis
```bash
python3 scripts/parse_dbf.py              # Parse medical DBF files
python3 scripts/analyze-weight-mapping.py  # Analyze constitution mapping
```

### KS-15 System Validation
```bash
node scripts/test-corrected-ks15.mjs      # Test KS-15 system functionality
node scripts/validate-ks15-standard.mjs   # Validate against medical standard
```

## Development Workflow
1. **Start development**: `npm run dev`
2. **Make changes** to code
3. **Check formatting**: `npm run format:check` or auto-format with `npm run format`
4. **Lint code**: `npm run lint`
5. **Build for production**: `npm run build` (if preparing for deployment)

## Medical Data Workflow (When Working with KS-15)
1. Process DBF files: `python3 scripts/parse_dbf.py`
2. Validate constitution mapping: `python3 scripts/analyze-weight-mapping.py`
3. Test KS-15 functionality: `node scripts/test-corrected-ks15.mjs`
4. Validate medical standards: `node scripts/validate-ks15-standard.mjs`

## Task Completion Checklist
After completing any significant changes:
- [ ] `npm run lint` (must pass)
- [ ] `npm run format:check` (must pass)
- [ ] `npm run build` (must succeed without errors)
- [ ] If modifying KS-15: Run medical validation scripts