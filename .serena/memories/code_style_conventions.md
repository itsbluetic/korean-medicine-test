# Code Style and Conventions

## TypeScript Style
- **Strict Mode**: Full TypeScript strict mode enabled
- **Interface Naming**: PascalCase for interfaces (`DiagnosisResult`, `TestResult`)
- **Type Definitions**: Centralized in `src/types/index.ts`
- **Exports**: Named exports preferred over default exports for utilities

## Component Conventions
- **Functional Components**: All components use React function syntax
- **Hook Usage**: Custom hooks prefixed with `use` (`useKS15Test`, `useConstitutionTest`)
- **Props Typing**: All component props explicitly typed
- **Component Files**: PascalCase matching component name

## File Organization
- **Absolute Imports**: Use `@/` prefix for all internal imports (not relative paths)
- **File Naming**: 
  - Components: PascalCase (e.g., `TestResult.tsx`)
  - Hooks: camelCase with `use` prefix (e.g., `useTheme.ts`)
  - Utilities: kebab-case (e.g., `ks15-diagnosis.ts`)
  - Data files: kebab-case (e.g., `ks15-questions.ts`)

## Medical Data Conventions
- **KS-15 Naming**: All KS-15 related files prefixed with `ks15-`
- **Constitution Types**: 
  - Legacy: `'taeyang' | 'taeeum' | 'soyang' | 'soeum'`
  - KS-15: `'taeumin' | 'soyangin' | 'soeumin'`
- **Medical Comments**: Korean comments for medical terminology
- **Data Validation**: All medical data must pass validation scripts

## React Patterns
- **State Management**: Custom hooks for complex state (not Context API)
- **Error Boundaries**: Graceful handling of calculation errors
- **Loading States**: Proper loading indicators for async operations
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Styling Conventions
- **Tailwind CSS**: Utility-first approach
- **Dark Mode**: `dark:` variants for all styled elements
- **Responsive**: Mobile-first design with `sm:`, `md:`, `lg:` breakpoints
- **Component Variants**: Conditional classes based on props/state

## Performance Guidelines
- **Memoization**: Use `useMemo` for expensive calculations
- **Code Splitting**: Route-based splitting for main features
- **Image Optimization**: Next.js Image component for all images
- **Bundle Analysis**: Monitor bundle size especially for medical data

## Git and Deployment
- **Commit Messages**: Conventional commits format
- **Branch Names**: `feature/`, `bugfix/`, `medical/` prefixes
- **No Secrets**: Never commit API keys or sensitive medical data
- **Build Verification**: All commits must pass `npm run build`

## Documentation Standards
- **Code Comments**: Korean for medical terms, English for technical concepts
- **README Updates**: Maintain dual-system documentation
- **Type Documentation**: JSDoc comments for complex medical algorithms
- **Medical Validation**: Document all medical data sources and validation