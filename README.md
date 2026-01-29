# Node.js TypeScript Prisma Boilerplate

A production-ready Node.js backend boilerplate with TypeScript and Prisma ORM.

## Features

- ⚡ **Express.js** - Fast, unopinionated web framework
- 📘 **TypeScript** - Type-safe JavaScript with strict mode
- 🗃️ **Prisma ORM** - Next-generation database toolkit
- 🔒 **Helmet** - Security middleware
- 🌐 **CORS** - Cross-Origin Resource Sharing enabled
- 🔄 **Hot Reload** - Development with nodemon

## Project Structure

```
├── prisma/
│   └── schema.prisma      # Prisma schema
├── src/
│   ├── config/            # Configuration files
│   │   ├── database.ts    # Prisma client singleton
│   │   └── index.ts       # App configuration
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Express middlewares
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   └── index.ts           # App entry point
├── .env.example           # Environment variables template
├── nodemon.json           # Nodemon configuration
├── package.json
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

4. Push database schema:
   ```bash
   npm run prisma:push
   ```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Production

Build and start for production:

```bash
npm run build
npm start
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production server |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio GUI |
| `npm run prisma:push` | Push schema changes to database |

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `DATABASE_URL` | Database connection string | `file:./dev.db` |

## License

ISC
