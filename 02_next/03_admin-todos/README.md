
## RECURSOS 

- prisma
    - [what is prisma](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
    - [nextjs prisma postgres](https://vercel.com/guides/nextjs-prisma-postgres)
  
- validar con [yup](https://www.npmjs.com/package/yup) las peticiones HTTP

- [cookies-next](https://www.npmjs.com/package/cookies-next)

- [next-auth example](https://next-auth.js.org/getting-started/example)
- [generate-secret.vercel](https://generate-secret.vercel.app/32)

## Development

Pasos para levantar la base de datos 

1. Correr la db en un contenedor
```
docker compose up -d
```
2. Renombrar el __.en.template__ a __.env__
3. Remplazar las vairalbes de entorno 
4. Ejecutar el comando __npm install__ para reconstruir los módulos de node
5. Ejecutar el comando __npm run dev__ para ejecutar aplicación en desarrollo
6. Ejecutar estos comandos de Prisma

```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED para crear la base de datos local

## PRISMA
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
## APUNTES
> [!NOTE]  
> Actualizar data desde un Server Component 
> router.refresh();  
> recarga la ruta actual y solo recarga los componentes afectados
```javascript
'use client' // <<<< OJO
import { useRouter } from "next/navigation" // <<<< OJO

export const TodoGrid = ( { todos = []}: Props) => {

    const router = useRouter(); 

    const toggleTodo = async(id: string, complete: boolean) => {
        await todosApi.updateTodo( id, complete ); // llamamos a la API
        router.refresh(); // <<<< actulizamos granularmente la vista
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                todos.map( item => (
                    <TodoItem key={ item.id } todo={ item } toggleTodo={toggleTodo}/>
                ))
            }
        </div>
    )
}
```

### Server Actions 
creamos un archivo donde van a estar las funciones que van a interactuar con la db y al mismo tiempo    
van a actulizar el estado del componente 
```javascript
'use server' // <<<< OJO

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo =  async( id: string, complete: boolean): Promise<Todo>=>{

    const todo = await prisma.todo.findFirst({where:{ id:id }})

    if( !todo ){
        throw `Todo con id: ${id} no encontrado`;
    }

    const updateTodo = await prisma.todo.update({
        where: { id: id },
        data: { complete: complete }
    })

    revalidatePath('/dashboard/server-actions')
    return updateTodo;

}

```
Despues podemos llamar esa misma funcion directamente en el componente
```javascript
  const onNewTodo = async (e: FormEvent) => {
    e.preventDefault()
    if( description.trim().length === 0 ) return; 

    // creando mediante API
    // await createTodo(description);
    // router.refresh();
    // creando mediante SERVER ACTIONS
    await createTodo(description)
    setDescription('');

  }
```
> [!NOTE]  
> Actualizar data desde un Server Actions 
> revalidatePath('/dashboard/server-actions') 
> recarga la ruta actual y solo recarga los componentes afectados

> [!WARNING]  
> Cuando trabajamos con server actions, si pasamos un objeto como parametro, dicho objeto no puede tener funciones

### useOptimistic Hook - React 
actulizamos la vista lo mas rapido posible sin esperar una respeusta del back, si algo sale mal, deberiamos 
mostrar un mensaje de que no se pudo completar la operacion y volvemos el estado a los valores que tenia
```javascript
    const [todoOptimistic, setTodoOptimistic] = useOptimistic(
        todo,
        (state, newCompleteValue:boolean) => ({...state, complete: newCompleteValue})
    )

    const onToggleTodo = async () => {
        
        try {
            startTransition( () => setTodoOptimistic( !todoOptimistic.complete));
            await toggleTodo(todoOptimistic.id, !todo.complete);
        } catch (error) {
            console.log(error)
            // vaolvemos el estado a los valores que tenia
            startTransition( () => setTodoOptimistic( !todoOptimistic.complete));
        }
    }
```

### Cookies en client components 
manejamos las cookies en el front con el paquete cookies-next
```javascript
    import { getCookie, hasCookie, setCookie } from "cookies-next"

    if( hasCookie('cart') ){
        const cookieCart = JSON.parse( getCookie('cart') ?? '{}'); // la validacion ?? '{}' es por TS 
        return cookieCart;
        setCookie( 'cart', JSON.stringify(cookieCart))
    }

```

### Cookies en server components 
```javascript
    import { cookies } from 'next/headers' // <<<< no se instala

    const cookieStore = await cookies()
    const cookieTab = cookieStore.get('selectedTab')?.value || '1'

```

### NextAuth.js

[next-auth](https://next-auth.js.org/)

1. install next-auth
```
npm install next-auth
```

2. creamos el archivo __api/auth/[...nextauth]/router.ts.__
```javascript
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

3. [add NEXTAUTH_SECRET to .env](https://next-auth.js.org/configuration/options#secret)
4. [generate NEXTAUTH_SECRET](https://generate-secret.vercel.app/32)

> [!NOTE]  
> tenems que crear un OAuth Apps  
> github profile/settings/developer settings/OAuth Apps 
5. [config github provider](https://next-auth.js.org/providers/github)
    - [config callback url](https://next-auth.js.org/configuration/providers/oauth)
    - GITHUB_ID se genera automaticamente 
    - GITHUB_SECRET se genera solo una vez
 
> [!NOTE]  
> example callback url  
> [origin]/api/auth/callback/[provider]  
> http://localhost:3000/api/auth/callback/github  

#### - Obtener sesion del lado del servidor 
```javascript
```

#### - Obtener sesion del lado del cliente 
```javascript
```

### - Guardar usuarios que ingresan con providers  Prisma Adapter - AuthJS
1. instalacion 
```javascript
  npm install @prisma/client @auth/prisma-adapter
  npm install prisma --save-dev
```
2. configuracion 
En el archivo __app/api/auth/[...nextauth]/routes.ts__ agregamos lo siguiente:
```javascript
  import prisma from "@/lib/prisma"; // <<<< 
  import { PrismaAdapter } from "@auth/prisma-adapter"; // <<<< 

  export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter, // <<<< 
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID ?? '',
        clientSecret: process.env.GITHUB_SECRET ?? '',
      }),
      // ...add more providers here
    ],
  }
```
3. Copiamos el modelo que nos recomiendan en la [documentacion](https://authjs.dev/getting-started/adapters/prisma#schema) en el archivo de los modelos __prisma/schema.prisma__ 
4. creamos la migracion 
```javascript
  npm exec prisma migrate dev
```
5. creamos el cliente
```javascript
  npm exec prisma generate
```