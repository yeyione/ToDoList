import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

interface StoredTasks {
  tasks: Task[];
  nextId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {
  private readonly storageKey = 'taskmaster_tasks';

  load(): StoredTasks {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return { tasks: [], nextId: 1 };
      }

      const data = JSON.parse(raw) as StoredTasks;
      if (!Array.isArray(data.tasks)) {
        return { tasks: [], nextId: 1 };
      }

      return {
        tasks: data.tasks,
        nextId: typeof data.nextId === 'number' ? data.nextId : 1,
      };
    } catch {
      return { tasks: [], nextId: 1 };
    }
  }

  save(tasks: Task[], nextId: number): void {
    localStorage.setItem(this.storageKey, JSON.stringify({ tasks, nextId }));
  }
}
