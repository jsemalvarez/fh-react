import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from 'yup';

export async function GET(request: Request){

    const { searchParams } = new URL(request.url)
    const take = Number( searchParams.get('limit') ?? '10')
    const skip = Number( searchParams.get('offset') ?? '0')

    if( isNaN(take) ){
        return NextResponse.json({ message: `limit: ${take} tiene que ser un numero`}, { status: 400 })
    }

    if( isNaN(skip) ){
        return NextResponse.json({ message: `offset: ${skip} tiene que ser un numero`}, { status: 400 })
    }

    const todos = await prisma.todo.findMany({take, skip })

    return NextResponse.json({todos})
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false)
})

export async function POST(request: Request){
    try {
        const { description, complete } = await postSchema.validate( await request.json() );
        const todo = await prisma.todo.create({ data: { description, complete }});
    
        return NextResponse.json(todo)
        
    } catch (error) {
        return NextResponse.json( error, { status: 400 })
    }
}

export async function DELETE(){

    try {
        await prisma.todo.deleteMany({where: { complete: true }});

        return NextResponse.json({ message: 'completed todos deleted' })

    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}