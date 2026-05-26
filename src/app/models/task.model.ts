export interface Task {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    priority: 'low' | 'medium' | 'high';
}
