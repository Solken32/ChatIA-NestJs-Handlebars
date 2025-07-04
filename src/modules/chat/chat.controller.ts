import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService){}

    @Post()
    async handleChat(@Body('messages') messages: any[]){
        const reply = await this.chatService.chatWithOpenAi(messages);
        //const audioUrl= await this.chatService.generateVoz(String(reply));          
        return { reply };  
    }          
}                      
