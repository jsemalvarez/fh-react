'use server'

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async( seconds: number = 0 ) => {

    return new Promise( resolve => {
      setTimeout(() => {
        resolve(true);
      },  seconds * 1000 );
    });
  
}

export const toggleTodo =  async( id: string, complete: boolean): Promise<Todo>=>{

    await sleep(3);

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

export const createTodo =  async( description: string )=>{

    try {

        const user = await getUserSessionServer();

        const todo = await prisma.todo.create({ data: { description, userId: user?.id || 'no-id' }});
    
        revalidatePath('/dashboard/server-actions')
        return todo;
        
    } catch (error) {
        console.log(error);
        return {
            message: 'Error creando Todo'
        }
    }

}

export const deleteTodo = async() => {
    try {
        const user = await getUserSessionServer();

        await prisma.todo.deleteMany({where: { complete: true, userId: user?.id }});

        revalidatePath('/dashboard/server-actions')
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}