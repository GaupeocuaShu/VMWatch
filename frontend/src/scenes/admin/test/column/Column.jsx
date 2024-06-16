import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "../task/Task";
import { Box } from "@mui/material";
import "./Column.css";
import img1 from "../task/bst-dong-ho-moi.avif";
import img2 from "../task/BST-dong-ho-nu-ban-chay.avif";
import img3 from "../task/couple_watch.jpg";
import img4 from "../task/trang-suc-nu-ban-chay.avif";
const srcs = [img1, img2, img3, img4];
export const Column = ({ tasks }) => {
    return (
        <div className="column">
            <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
            >
                <Box display="flex" justifyContent="space-between">
                    {tasks.map((task, index) => (
                        <Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            src={srcs[task.id]}
                        />
                    ))}
                </Box>
            </SortableContext>
        </div>
    );
};
