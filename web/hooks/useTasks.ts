import { useState, useEffect } from "react";
import { Task } from "../types"; 

export function useTasks(filter: "all" | "active" | "completed") {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    // Simulasi fetch data
    useEffect(() => {
        const dummyData: Task[] = [
            {
                id: "1",
                title: "Selesaikan 100 Commit",
                description: "Target malam ini harus tercapai demi masa depan!",
                completed: false,
                priority: "HIGH",
                createdAt: new Date().toISOString(),
                tags: ["coding"],
            },
            {
                id: "2",
                title: "Istirahat minum kopi",
                completed: true,
                priority: "MEDIUM",
                createdAt: new Date().toISOString(),
                tags: ["health"],
            },
        ];
    
        setTimeout(() => {
            setTasks(dummyData);
            setLoading(false);
        }, 1000);
    }, []);

    const addTask = async (title: string, priority: string) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            priority: priority as "LOW" | "MEDIUM" | "HIGH",
            createdAt: new Date().toISOString(),
            tags: [],
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    const toggleTask = async (id: string, completed: boolean) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
        );
    };

    const deleteTask = async (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return { tasks, loading, addTask, toggleTask, deleteTask };
}