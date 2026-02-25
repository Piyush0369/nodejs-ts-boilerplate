# Node.js TypeScript Prisma Boilerplate

A production-ready Node.js backend boilerplate with TypeScript and Prisma ORM.

## Features

- ⚡ **Express.js** - Fast, unopinionated web framework
- 📘 **TypeScript** - Type-safe JavaScript with strict mode
- 🗃️ **Prisma ORM** - Next-generation database toolkit
- 🔒 **Helmet** - Security middleware
- 🌐 **CORS** - Cross-Origin Resource Sharing enabled
- 🔄 **Hot Reload** - Development with nodemon
- 📱 **PWA Support** - Progressive Web App with offline capabilities

## Project Structure

```
├── prisma/
│   └── schema.prisma      # Prisma schema
├── public/
│   ├── icons/             # PWA icons
│   ├── index.html         # Frontend entry point
│   ├── manifest.json      # PWA manifest
│   └── service-worker.js  # Service worker for offline support
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
- MySQL database

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Configure your database connection in `.env`:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE?timezone=%2B05:30"
   ```

4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

5. Push database schema:
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

## Prisma ORM

### Schema Definition

The Prisma schema is located at `prisma/schema.prisma`. It defines the database models and their relationships.

**Current Schema:**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Prisma CLI Commands

| Command | Description |
|---------|-------------|
| `npx prisma generate` | Generate Prisma Client from schema |
| `npx prisma db push` | Push schema to database (development) |
| `npx prisma migrate dev` | Create and apply migrations (development) |
| `npx prisma migrate deploy` | Apply pending migrations (production) |
| `npx prisma migrate reset` | Reset database and apply all migrations |
| `npx prisma studio` | Open visual database editor |
| `npx prisma db pull` | Pull schema from existing database |
| `npx prisma format` | Format the schema file |
| `npx prisma validate` | Validate the schema file |

### Adding New Models

1. **Define the model** in `prisma/schema.prisma`:

   ```prisma
   model Post {
     id        String   @id @default(cuid())
     title     String
     content   String?  @db.Text
     published Boolean  @default(false)
     authorId  String
     author    User     @relation(fields: [authorId], references: [id])
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }

   // Update User model to include relation
   model User {
     id        String   @id @default(cuid())
     email     String   @unique
     name      String?
     posts     Post[]   // Add this line
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

2. **Create a migration**:
   ```bash
   npx prisma migrate dev --name add_post_model
   ```

3. **Generate the updated client**:
   ```bash
   npm run prisma:generate
   ```

### Common Query Examples

**Create:**
```typescript
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  },
});
```

**Read:**
```typescript
// Find many
const users = await prisma.user.findMany({
  where: { name: { contains: 'John' } },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

// Find unique
const user = await prisma.user.findUnique({
  where: { id: 'user-id' },
});

// Find with relations
const userWithPosts = await prisma.user.findUnique({
  where: { id: 'user-id' },
  include: { posts: true },
});
```

**Update:**
```typescript
const user = await prisma.user.update({
  where: { id: 'user-id' },
  data: { name: 'Jane Doe' },
});
```

**Delete:**
```typescript
await prisma.user.delete({
  where: { id: 'user-id' },
});
```

**Transactions:**
```typescript
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: 'a@b.com' } }),
  prisma.post.create({ data: { title: 'Hello', authorId: 'user-id' } }),
]);
```

### Field Types Reference

| Prisma Type | MySQL Type | Description |
|-------------|------------|-------------|
| `String` | `VARCHAR(191)` | Variable-length string |
| `String @db.Text` | `TEXT` | Long text |
| `Int` | `INT` | Integer |
| `BigInt` | `BIGINT` | Large integer |
| `Float` | `DOUBLE` | Floating point |
| `Decimal` | `DECIMAL(65,30)` | Precise decimal |
| `Boolean` | `TINYINT(1)` | True/false |
| `DateTime` | `DATETIME(3)` | Date and time |
| `Json` | `JSON` | JSON data |
| `Bytes` | `LONGBLOB` | Binary data |

### Attributes Reference

| Attribute | Description |
|-----------|-------------|
| `@id` | Primary key |
| `@unique` | Unique constraint |
| `@default(value)` | Default value |
| `@updatedAt` | Auto-update timestamp |
| `@relation` | Define relation |
| `@map("column_name")` | Map to different column name |
| `@@map("table_name")` | Map to different table name |
| `@@unique([field1, field2])` | Compound unique constraint |
| `@@index([field1, field2])` | Create index |

### Database Connection

The Prisma client singleton is configured in `src/config/database.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

### Migration Workflow

**Development:**
```bash
# Create and apply migration
npx prisma migrate dev --name descriptive_name

# Reset database (deletes all data)
npx prisma migrate reset
```

**Production:**
```bash
# Apply pending migrations
npx prisma migrate deploy
```

### Seeding Data

1. Create `prisma/seed.ts`:

   ```typescript
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();

   async function main() {
     const user = await prisma.user.upsert({
       where: { email: 'admin@example.com' },
       update: {},
       create: {
         email: 'admin@example.com',
         name: 'Admin User',
       },
     });
     console.log({ user });
   }

   main()
     .catch((e) => {
       console.error(e);
       process.exit(1);
     })
     .finally(async () => {
       await prisma.$disconnect();
     });
   ```

2. Add to `package.json`:
   ```json
   {
     "prisma": {
       "seed": "ts-node prisma/seed.ts"
     }
   }
   ```

3. Run the seed:
   ```bash
   npx prisma db seed
   ```

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
| `DATABASE_URL` | MySQL connection string with timezone | Required |

### Database URL Format

```
mysql://USER:PASSWORD@HOST:PORT/DATABASE?timezone=%2B05:30
```

- `USER` - Database username
- `PASSWORD` - Database password
- `HOST` - Database host (localhost or remote)
- `PORT` - Database port (default: 3306)
- `DATABASE` - Database name
- `timezone=%2B05:30` - URL-encoded timezone (+05:30 for IST)

## License

ISC
