import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
    // añadir constructor para usar el service task
    constructor (private taskService: TaskService) {}
    @Get()
    getAllTask(){
        return this.taskService.getAllTask();

    }

    @Post()
    createTask(@Body() newTask: createTaskDto){
        return this.taskService.createTask(newTask.title , newTask.description);
        //this.taskService.createTask()
    }

    @Delete(":id")
    deleteTask(@Param("id") id:string){
        this.taskService.deleteTask(id);                                                   
    }                                            
}
