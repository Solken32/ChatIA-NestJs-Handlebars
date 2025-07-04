import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TaskService {
    // servicio es para crear metodos que podemos reutilizar

    private task: Task[] = [
        {
            id: '1',
            title: 'task example',
            description: 'task example description',
            status: TaskStatus.PENDING,
        },
    ];

    getAllTask() {
        return this.task;
    }
    createTask(title: string, description: string) {
        const task = {
            id: new Date().toISOString(),
            title,
            description,
            status: TaskStatus.PENDING,
        };
        this.task.push(task);
        return task;
    }
    deleteTask(id: string) {
        this.task =  this.task.filter(task=> task.id !== id);
    }
    
    /* updateTask(id: string, updatedFields:any) {
        const task = this.getTaskById(id);
        const newTask= Object.assign(task, updatedFields);
        this.task= this.task.map(task => task.id ===id ? newTask: task )

        return newTask;

    }

    getTaskById( id: string): Task {
        return this.task.find(task => task.id === id); 
    }   */                                                                                                                               
}
