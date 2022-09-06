import { Task } from "./ProjectResponse";

export interface Project {
    name: string;
    id: string;
    toDo: Task[];
    done: Task[];
}