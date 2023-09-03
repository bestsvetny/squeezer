import { Module } from '@nestjs/common';
import { ChatGateway } from 'src/chat/chat.gateway';

@Module({
    imports: [],
    providers: [ChatGateway]
})
export class ChatModule {}
