import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [ChatModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
