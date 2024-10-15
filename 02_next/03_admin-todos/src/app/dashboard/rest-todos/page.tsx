import prisma from "@/lib/prisma"
import { NewTodo } from "@/todos/components/NewTodo"
import { TodoGrid } from "@/todos/components/TodoGrid"


export const metada = {
    title: 'Todos',
    description: 'todos list'
}

export default async function ResTdosPage(){

    const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' }})

    return(
        <>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodoGrid todos={todos} />
        </>
    )
}