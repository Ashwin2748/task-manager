export interface ProjectRespose {
    name: string;
    _id?: string;
    userId?: string;
    tasks?: Task[];
}

export interface Task {
    name: string;
    expirationDate: Date;
    creationDate: Date;
    completedDate: Date | null;
}