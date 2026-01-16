import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Fetch all tasks
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const filter = searchParams.get('filter');

        let whereClause = {};
        if (filter === 'completed') {
            whereClause = { completed: true };
        } else if (filter === 'active') {
            whereClause = { completed: false };
        }

        const tasks = await prisma.task.findMany({
            where: whereClause,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tasks' },
            { status: 500 }
        );
    }
}

// POST - Create new task
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, priority, dueDate, tags } = body;

        if (!title || title.trim().length === 0) {
            return NextResponse.json(
                { error: 'Title is required' },
                { status: 400 }
            );
        }

        const newTask = await prisma.task.create({
            data: {
                title: title.trim(),
                description: description || null,
                priority: priority || 'MEDIUM',
                dueDate: dueDate ? new Date(dueDate) : null,
                tags: tags || [],
            },
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json(
            { error: 'Failed to create task' },
            { status: 500 }
        );
    }
}

// PATCH - Update task
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Task ID is required' },
                { status: 400 }
            );
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json(
            { error: 'Failed to update task' },
            { status: 500 }
        );
    }
}

// DELETE - Delete task
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Task ID is required' },
                { status: 400 }
            );
        }

        await prisma.task.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: 'Task deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json(
            { error: 'Failed to delete task' },
            { status: 500 }
        );
    }
}