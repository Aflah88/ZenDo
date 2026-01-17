import { useState, useEffect, useMemo } from "react";
import { Task } from "../types";

export function useTasks(filter: "all" | "active" | "completed") {
    //  simpan SEMUA data di sini (Master Data)
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    // useEffect cuma jalan SEKALI pas pertama kali load (Mounting)
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
        {
            id: "3",
            title: "Beli Cemilan",
            description: "Biar ga ngantuk pas ngoding",
            completed: false,
            priority: "LOW",
            createdAt: new Date().toISOString(),
            tags: ["life"],
        },
    ];

    // Simulasi delay network
    const timer = setTimeout(() => {
        setAllTasks(dummyData);
        setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
    }, []); // <-- Dependency array kosong, artinya cuma jalan sekali

    // 3. Derived State: Hitung hasil filter secara real-time (tanpa useEffect)
    // useMemo memastikan filter cuma jalan kalau data / jenis filter berubah
    const filteredTasks = useMemo(() => {
        return allTasks.filter((task) => {
            if (filter === "active") return !task.completed;
            if (filter === "completed") return task.completed;
            return true;
        });
    }, [allTasks, filter]);

    // 4. Update Handler (Tetap update ke Master Data 'allTasks')
    const addTask = async (title: string, priority: string) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            priority: priority as "LOW" | "MEDIUM" | "HIGH",
            createdAt: new Date().toISOString(),
            tags: [],
        };
        setAllTasks((prev) => [newTask, ...prev]);
    };

    const toggleTask = async (id: string, completed: boolean) => {
        setAllTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
        );
    };

    const deleteTask = async (id: string) => {
        setAllTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return { 
        tasks: filteredTasks, // Return hasil filter, bukan master data
        loading, 
        addTask, 
        toggleTask, 
        deleteTask 
     };
}