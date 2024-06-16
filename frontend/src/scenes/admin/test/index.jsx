import { useState } from "react";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { Column } from "./column/Column";
import { Input } from "./input/Input";
import { Droppable } from "./Droppable";
export default function Test() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Add tests to homepage" },
        { id: 2, title: "Fix styling in about section" },
        { id: 3, title: "Learn how to center a div" },
        { id: 4, title: "Learn how to use grid " },
    ]);

    const addTask = (title) => {
        setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
    };

    const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);
    const handleDragOver = (event) => {
        console.log(event);
    };
    const handleDragEnd = (event) => {
        console.log(event);
        const { active, over } = event;

        if (active.id === over.id) return;

        setTasks((tasks) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);

            return arrayMove(tasks, originalPos, newPos);
        });
    };

    return (
        <div className="App">
            <h1>My Tasks ✅</h1>
            <Input onSubmit={addTask} />
            <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
            >
                <Column id="toDo" tasks={tasks} />

                <Droppable>Remove</Droppable>
            </DndContext>
        </div>
    );
}
