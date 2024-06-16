import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Box } from "@mui/material";

export function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Box width="200px" height="100px" bgcolor="white">
                {props.children}
            </Box>
        </button>
    );
}
