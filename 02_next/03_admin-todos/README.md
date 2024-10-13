This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## RECURSOS 

- prisma
    - [what is prisma](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
    - [nextjs prisma postgres](https://vercel.com/guides/nextjs-prisma-postgres)
  
- validar con [yup](https://www.npmjs.com/package/yup) las peticiones HTTP

## Development

Pasos para levantar la base de datos 

1. Correr la db en un contenedor
```
docker compose up -d
```
2. Renombrar el __.en.template__ a __.env__
3. Remplazar las vairalbes de entorno 
4. Ejecutar el __SEED__ para crear una base de datos 

## prisma comands
```
npx prisma init

// sincronizar los modelos con la db
npx prisma migrate dev

// generar el cliente de prisma
npx prisma generate
```

### Now, add the following code to this file: 
__lib/prisma.ts__
```
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
```

## Endpoints 
```
GET /api/todos?limit=2&offset=2

GET /api/todos/:id

POST /api/todos/
body = {
  "description": "hacer el curso de next",
}

PUT /api/todos/:id
body = {
  "description": "hacer el modulo 10 del curso de next",
  "complete": true
}

```