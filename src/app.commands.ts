
import { Injectable } from '@nestjs/common';
import { Context, TextCommand, TextCommandContext, Arguments, SlashCommand, SlashCommandContext, Options, TargetUser, UserCommand, UserCommandContext, MessageCommand, MessageCommandContext, TargetMessage, ButtonContext, Button, SelectedStrings, StringSelect, StringSelectContext, Modal, ModalContext } from 'necord';
import { TextDto } from './dtos/text.dto';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, User } from 'discord.js';
import { NestApplication } from '@nestjs/core';

@Injectable()
export class AppCommands {
  @TextCommand({
    name: 'ping',
    description: 'Responds with pong!',
  })
  public onPing(
    @Context() [message]: TextCommandContext,
    @Arguments() args: string[],
  ) {
    return message.reply('pong..........!');
  }

  @SlashCommand({
    name: 'ping',
    description: 'Responds with pong!',
  })
  public async onSlashPing(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({ content: 'Pong!' });
  }

  @SlashCommand({
    name: 'health',
    description: 'Responds with api health!',
  })
  public async onHealth(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({ content: 'Healthy!' });
  }

  @SlashCommand({
    name: 'length',
    description: 'Calculate the length of your text',
  })
  public async onLength(
    @Context() [interaction]: SlashCommandContext,
    @Options() { text }: TextDto,
  ) {
    return interaction.reply({
      content: `The length of your text is: ${text.length}`,
    });
  }

  @SlashCommand({
    name: 'uppercase',
    description: 'Convert your text to uppercase',
  })
  public async onCase(
    @Context() [interaction]: SlashCommandContext,
    @Options() { text }: TextDto,
  ) {
    return interaction.reply({
      content: `Your text is: ${text.toUpperCase()}`,
    });
  }

  @SlashCommand({
    name: 'url',
    description: 'Convert your text to uppercase',
  })
  public async onUrl(
    @Context() [interaction]: SlashCommandContext
  ) {
    return interaction.reply({
      content: `Your local url is: ${process.env.APP_URL}; & https://innocent-hugely-phoenix.ngrok-free.app/`,
    });
  }

  @MessageCommand({ name: 'copy' })
  public async copyMessage(
    @Context() [interaction]: MessageCommandContext,
    @TargetMessage() message: Message
  ) {
    return interaction.reply({ content: message.content });
  }

  @MessageCommand({ name: 'greet' })
  public async greet(
    @Context() [interaction]: MessageCommandContext,
    @TargetMessage() message: Message
  ) {
    return interaction.reply({ content: 'Hi' });
  }

  @Button('BUTTON') // Custom ID is 'BUTTON'
  public onButton(@Context() [interaction]: ButtonContext) {
    return interaction.reply({ content: 'Button clicked!' });
  }
  
  @TextCommand({
    name: 'button',
    description: 'Sends a message with a button!',
  })
  public async sendButton(
    @Context() [interaction]: TextCommandContext,
  ) {
    const button = new ButtonBuilder()
      .setCustomId('BUTTON') // The custom ID should match the one in @Button
      .setLabel('Click Me!')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.reply({
      content: 'Here is your button!',
      components: [row],
    });
  }

  @StringSelect('SELECT_MENU')
  public onSelectMenu(
    @Context() [interaction]: StringSelectContext,
    @SelectedStrings() values: string[],
  ) {
    return interaction.reply({ content: `You selected: ${values.join(', ')}` });
  }

  @Modal('pizza')
  public onModal(@Context() [interaction]: ModalContext) {
    return interaction.reply({
      content: `Your fav pizza : ${interaction.fields.getTextInputValue('pizza')}`
    });
  }
}
