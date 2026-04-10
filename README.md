# 🍹 Cocktail Browser

A React + TypeScript app for browsing cocktails using the [KNS Cocktails API](https://cocktails.solvro.pl) by KN Solvro.

## 🚀 Live Demo

https://majkan1.github.io/Cocktail-App/

## 📸 Preview

<img width="1560" height="1026" alt="image" src="https://github.com/user-attachments/assets/99c61ef3-0f2c-4ad4-922f-b7bbac6f7473" />


---

## 🛠️ Tech Stack

- **React 18** — UI
- **TypeScript** — type safety
- **React Router v6** — routing & pagination
- **KNS Cocktails API** — data source (`cocktails.solvro.pl`)
- **CSS** — custom responsive styles

---

## 📁 Project Structure

```
src/
├── App.tsx        # All components and logic
├── App.css        # Styles
└── main.tsx       # Entry point
```

---

## ⚙️ Features

- Browse **250 cocktails** fetched from the KNS API
- **Search** cocktails by name in real time
- **Pagination** — 5 pages, 50 cocktails each
- Each card shows:
  - Name
  - Alcoholic / Non-alcoholic label
  - Cocktail image
  - Ingredient list
  - Favourite checkbox

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Majkan1/Cocktail-App.git

# Navigate to the project folder
cd your-repo-name

# Install dependencies
npm install

# Start the development server
npm run dev
```

App will be available at `http://localhost:5173`

---

## 🌐 API

This project uses the **KNS Cocktails API**:

| Endpoint | Description |
|---|---|
| `GET /api/v1/cocktails?page=N&perPage=50` | Paginated list of cocktails |
| `GET /api/v1/cocktails/{id}` | Single cocktail with full ingredient details |

---

## 📋 Data Model

```ts
interface Ingredient {
  name: string
}

interface SingleCocktail {
  id: number
  name: string
  alcoholic: boolean
  imageUrl: string
  ingredients: Ingredient[]
}
```

---

## 📄 License

MIT
