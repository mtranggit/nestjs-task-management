import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // if we have any filters defined, call taskService.getTaskWithFilters
    // otherwise, just get all tasks
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') updateTaskStatusDto: UpdateTaskStatusDto,
    // @Body('status') status: TaskStatus,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    // @Body('title') title: string,
    // @Body('description') description: string,
  ): Task {
    const newTask = this.tasksService.createTask(createTaskDto);
    // createTask(@Body() body): Task {
    //   const { title, description } = body;
    // const newTask = this.tasksService.createTask({
    //   title,
    //   description,
    // });

    return newTask;
  }
}
