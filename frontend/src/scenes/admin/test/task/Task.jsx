import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import "./Task.css";
import { Typography } from "@mui/material";

export const Task = ({ id, title, src }) => {
    const { attributes, listeners, setNodeRef, transform } = useDroppable({
        id,
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="task"
        >
            <input type="checkbox" className="checkbox" />
            <Typography variant="h6" color="black">
                {title}
            </Typography>
            <img alt="test" src={src} height="200p" />
        </div>
    );
};
