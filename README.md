# 🍹 Cocktail App

A cocktail browser built with React and TypeScript. Search and explore hundreds of cocktails from a public REST API — with images, ingredients, glass type, and a favourites system using Polish UI labels.

> **Live demo:** *(add your Vercel or GitHub Pages link here)*

---

## Screenshot

![Cocktail App Screenshot](./Screenshot%202026-03-16%20130623.png)

---

## Features

- Browse hundreds of cocktails fetched from the CocktailDB API
- Each card displays: name, category, glass type, alcoholic/non-alcoholic status, and a photo
- Favourites system — mark cocktails as "Ulubiony" (favourite) with a checkbox
- Responsive card grid — adapts from 2 columns on mobile to 5 on desktop
- Fast search/filter functionality

---

## Tech stack

| Technology | Purpose |
|---|---|
| React 18 | Component architecture and state management |
| TypeScript | Strict typing for API response models |
| CSS3 | Custom responsive grid layout |
| TheCocktailDB API | Cocktail data, images, and ingredients |
| Fetch + async/await | API integration |
| Vite | Build tool and dev server |

---

## Technical decisions

**Why TypeScript interfaces for API responses?**
TheCocktailDB API returns loosely typed JSON with many nullable fields (ingredients can be `null` or a string depending on the cocktail). Defining a strict `CocktailDTO` interface with `string | null` types for nullable fields forces explicit null-checks throughout the app and prevents crashes when rendering cards for cocktails with fewer than the maximum number of ingredients.

```ts
interface CocktailDTO {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strDrinkThumb: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  // ... up to 15 ingredients
}
```

**Why a separate favourites state at the App level?**
The favourite status needs to persist as the user browses and filters cocktails. If the state lived inside each card component, it would reset whenever the card unmounted. Keeping a `Set<string>` of favourite IDs at the top level means the favourite state is stable regardless of filtering or pagination.

**Why a CSS grid instead of a UI library?**
Using a custom CSS grid (as opposed to a component library like MUI or Chakra) demonstrates understanding of responsive layout fundamentals — `repeat(auto-fill, minmax())`, gap, and breakpoints. It also keeps the bundle smaller.

---

## Getting started

```bash
# 1. Clone the repository
git clone https://github.com/Majkan1/Cocktail-App.git
cd Cocktail-App

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

No API key required — TheCocktailDB free tier is public.

---

## Project structure

```
src/
├── components/
│   ├── CocktailCard.tsx      # Individual cocktail card
│   ├── CocktailGrid.tsx      # Responsive grid layout
│   ├── SearchBar.tsx         # Search and filter controls
│   └── FavouritesBadge.tsx   # Favourite count indicator
├── types/
│   └── cocktail.ts           # TypeScript interfaces for API + app models
├── hooks/
│   └── useCocktails.ts       # Fetch logic, loading state, error handling
├── utils/
│   └── parseIngredients.ts   # Strips null ingredients from API response
└── App.tsx
```

---

## What I learned

- How to type nullable API responses with TypeScript union types (`string | null`)
- Managing shared state (favourites) at the right level to avoid stale data
- Building a responsive CSS grid without a UI library
- Separating data-fetching logic into a custom hook for cleaner components

---

## License

MIT
