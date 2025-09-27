# Tech Stack and Development Setup

## Core Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (latest version)
- **PWA**: next-pwa (Service Worker, offline functionality)
- **Database/Data**: Visual FoxPro DBF files processed via Python
- **Development**: Turbopack (fast development server)
- **Deployment**: Vercel

## Development Dependencies
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier
- **Data Processing**: Python 3 (for DBF file parsing)
- **Medical Data**: node-dbf package for DBF processing

## Key Package Versions
- Next.js: 15.5.4
- React: 19.1.0
- TypeScript: 5.x
- Tailwind CSS: 4.x (cutting edge)

## Important Notes
- Uses latest Next.js 15 App Router (not Pages Router)
- Tailwind CSS v4 requires specific PostCSS configuration
- Medical data processing requires Python environment
- PWA functionality requires HTTPS in production