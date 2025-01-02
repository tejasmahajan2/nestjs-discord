import { Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppCommands } from './app.commands';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages],
      development: [process.env.DISCORD_DEVELOPMENT_GUILD_ID]
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppUpdate, AppCommands],
})
export class AppModule {}
