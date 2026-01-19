# ZenDo

Aplikasi manajemen tugas modern yang menggabungkan produktivitas dengan monitoring stres. ZenDo membantu Anda mencapai target dengan bijak dan sehat.

## 🚀 Teknologi

### Frontend
- **Next.js 16** - React framework dengan App Router
- **React 19.2** - UI library terbaru
- **TypeScript** - Type safety
- **Tailwind CSS 4.1** - Utility-first styling
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js + Next.js API Routes** - API server
- **Prisma** - ORM untuk database
- **PostgreSQL** - Database utama

## 📦 Instalasi

### Prerequisites
- Node.js 20.9+
- npm atau yarn
- PostgreSQL (untuk database)

### Setup Frontend

```bash/terminal
# Clone repository
git clone https://github.com/Aflah88/ZenDo.git

# Jalankan server api
cd zendo/api
npm run dev

cd zendo/web
# Install dependencies
npm install

# Setup environment variables
# Edit .env dengan konfigurasi Anda

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

### Setup Backend

```bash
cd zendo/api

# Install dependencies
npm install

# Setup environment variables
cp .env
# Edit .env dengan DATABASE_URL Anda

# Setup database
npx prisma migrate dev

# Jalankan development server
npm run dev
```

API akan berjalan di `http://localhost:3001`

## 📂 Struktur Project

```
zendo/
├── web/                          # Frontend Next.js
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # Home/Dashboard
│   │   │   ├── shop/            # ZenStore page
│   │   │   ├── tugas/           # Task management
│   │   │   ├── components/      # Reusable components
│   │   │   │   ├── StressIndicator.tsx
│   │   │   │   ├── Statistics.tsx
│   │   │   │   ├── TaskForm.tsx
│   │   │   │   ├── TaskList.tsx
│   │   │   │   ├── BarangCard.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   └── globals.css
│   │   ├── hooks/
│   │   │   └── useTasks.ts      # Custom hook for tasks
│   │   ├── types/
│   │   │   └── index.ts         # Type definitions
│   │   └── lib/
│   │       └── api.ts           # API client
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── tailwind.config.ts
│
└── api/                          # Backend Next.js
    ├── src/
    │   ├── app/api/
    │   │   ├── barang/          # Barang routes
    │   │   │   ├── route.ts
    │   │   │   ├── beli/
    │   │   │   └── id/
    │   │   └── tasks/           # Tasks routes
    │   ├── lib/
    │   │   └── db.ts            # Prisma client
    │   └── prisma/
    │       └── schema.prisma    # Database schema
    ├── package.json
    └── .env
```
**Tim ZenDo** - Menciptakan produktivitas yang sehat dan berkelanjutan
---

<div align="center">

Made with ❤️ 

</div>
