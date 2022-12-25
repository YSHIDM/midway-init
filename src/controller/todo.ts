import {
  Body,
  Controller,
  Inject,
  Post
} from '@midwayjs/decorator';
import { TodoService } from '../service/todo';

@Controller('/todo')
export class UserController {
  @Inject()
  todoService: TodoService

  @Post('/saveTodo')
  async saveTodo(@Body() todo) {
    return this.todoService.saveTodo(todo)
  }
  @Post('/getPage')
  async getPage(@Body() query) {
    return this.todoService.getPage(query)
  }
  @Post('/getTodoById')
  async getTodoById(@Body() { id }) {
    return this.todoService.getTodoById(id)
  }
  @Post('/deleteTodoById')
  async deleteTodoById(@Body() { id }) {
    return this.todoService.deleteTodoById(id)
  }
  @Post('/todoArchive')
  async todoArchive(@Body() { id }) {
    return this.todoService.todoArchive(id)
  }
  @Post('/todoAbide')
  async todoAbide(@Body() { id }) {
    return this.todoService.todoAbide(id)
  }

}