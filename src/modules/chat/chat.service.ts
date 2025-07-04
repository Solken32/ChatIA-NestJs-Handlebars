import { Injectable } from '@nestjs/common';
import { openai } from 'src/config/openai.config';
import fs from "fs";
import path from "path";                
@Injectable()
export class ChatService {
    async chatWithOpenAi(messages: any[]){
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages,
        });

        return response.choices[0].message.content;

    }               

    /* async generateVoz(texto: string ): Promise<string> {
        const speechFilePath = path.resolve("./speech.mp3");
        const mp3= await openai.audio.speech.create({
            model: "gpt-4o",
            voice: "coral",
            input: texto,
        });               

        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(speechFilePath, buffer);                  

        return '/speech.mp3';
    } */           
}



