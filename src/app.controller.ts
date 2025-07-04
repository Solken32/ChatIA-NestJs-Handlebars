import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

import {ChatService}  from './modules/chat/chat.service'; 

@Controller()
export class AppController {
  constructor(private readonly chatService: ChatService) {}
  @Get()
  @Render("index")
  getHello() {
    return {};
    /* return this.appService.getHello(); */
  }

  // esto adicional para probar vista con handlebars
  @Post("chat")
  async handleChat(@Body("message") message: string){
    const reply = await this.chatService.chatWithOpenAi([
      { role: "user", content: message},
    ]); 

    return { reply };   
  }























}
