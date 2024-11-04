# Frontend notes


## Local development
1. In the root of project create .env.development from .env.example

2. Change directory to /fronted

3. Install dependencies:
```
npm install
```

4. Start development server:
```
npm run dev
```


## 📂 Frontend structure
```python
frontend/
  ├── public/               # Public assets
  ├── src/                  # Application source code
  │   ├── components/       # Reusable components
  │   │   └── ui/           # shadc/ui components
  │   ├── lib/              # Utility functions
  │   |   ├── fetch/        # Fetching logic for requests
  │   |   ├── utils.ts      # Reusable utility functions
  │   |   └── zod.ts        # Zod global configuration file (always import zod from this file!!!)
  │   ├── pages/            # All app subpages 
  │   │   ├── guest/        # Subpages for guests (folder structure describe real url)
  │   │   └── user/         # Subpages for login user (folder structure describe real url)
  │   ├── providers/        # Providers for global states sharing
  │   │   └── intl/         # Internacionalization logic
  │   │       └── locales/  # Json files with translations
  │   ├── App.tsx           # Application entry point
  │   ├── index.css         # Main CSS stylesheet
  │   ├── main.tsx          # Main rendering file
  │   └── router.tsx        # Main routing file
  ├── .eslintrc.json        # ESLint configuration
  ├── index.html            # HTML entry point
  ├── postcss.config.js     # PostCSS configuration
  ├── tailwind.config.js    # Tailwind CSS configuration
  ├── tsconfig.json         # TypeScript configuration
  └── vite.config.ts        # Vite configuration
```


## Technologies
- **React** - A JavaScript library for building user interfaces [docs](https://react.dev/learn).
- **Vite** - A fast, opinionated frontend build tool [docs](https://vitejs.dev/guide/).
- **TypeScript** - A typed superset of JavaScript that compiles to plain JavaScript [docs](https://www.typescriptlang.org/docs/).
- **Tailwind CSS** - CSS framework using css utility classes for styling [docs](https://tailwindcss.com/).
- **shadcn/ui** - UI components library [docs](https://ui.shadcn.com/docs).
- **lucide icons** - Icons library [docs](https://lucide.dev/).
- **React router dom** - Routing library for React [docs](https://reactrouter.com/en/main).
- **TanStack Query** - Library for fetching, caching, synchronizing and updating server state [docs](https://tanstack.com/query/v5/docs/react/reference/useQuery).
- **Zod** - Schema validator [docs](https://zod.dev).
- **React hook form** - Form state manager [docs](https://react-hook-form.com/ts).
- **Apexcharts** - Chart library [docs](https://apexcharts.com/docs/chart-types/line-chart/).
