# LocalStores - Find Stores Near You

A Next.js application for discovering local stores and products in your neighborhood. This project is built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Browse local stores by category
- View stores near your current location
- Search for stores by name or category
- View detailed store information and products
- Responsive design for all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **State Management**: React Hooks

## Project Structure

```
my-local-stores/
├── public/
│   └── images/           # Static images
├── src/
│   ├── app/              # App router pages
│   │   ├── page.tsx      # Home page
│   │   ├── layout.tsx    # Root layout
│   │   ├── search/       # Search page
│   │   └── stores/[id]/  # Store detail page
│   ├── components/       # Reusable components
│   │   ├── CategoryFilter.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   └── StoreCard.tsx
│   └── lib/              # Utilities and data
│       ├── data/         # Sample data
│       │   └── stores.ts
│       └── utils.ts      # Utility functions
└── ...config files
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/local-stores.git
   cd local-stores
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- **Home Page**: Browse nearby stores and filter by category
- **Store Detail Page**: View store information and products
- **Search Page**: Search for stores by name or category

## Future Enhancements

- User authentication and profiles
- Store reviews and ratings
- Real-time store inventory
- Integration with maps API for directions
- Online ordering functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- React Icons for the beautiful icons
