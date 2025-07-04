import { Injectable } from '@nestjs/common';
import { openai } from 'src/config/openai.config';

@Injectable()
export class ChatService {
    async chatWithOpenAi(messages: any[]){
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages,
        });

        return response.choices[0].message.content;

    }
}



