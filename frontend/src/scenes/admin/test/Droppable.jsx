import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
export function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: "droppable",
    });
    const style = {
        color: isOver ? "green" : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Box width="400px" height="200px" border="1px dashed white">
                {props.children}
            </Box>
        </div>
    );
}
