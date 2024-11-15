import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma"
import { NewTodo } from "@/todos/components/NewTodo"
import { TodoGrid } from "@/todos/components/TodoGrid"
import { redirect } from "next/navigation";


export const metada = {
    title: 'Todos',
    description: 'todos list'
}

export default async function ResTdosPage(){

    const user = await getUserSessionServer();
    if ( !user ) redirect('/api/auth/signin');
    
    const todos = await prisma.todo.findMany({ 
      where: { userId: user.id },
      orderBy: { description: 'asc' } 
    });

    return(
        <>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodoGrid todos={todos} />
        </>
    )
}