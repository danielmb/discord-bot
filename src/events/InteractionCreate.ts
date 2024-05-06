/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CacheType,
  ClientEvents,
  CommandInteraction,
  Message as DiscordMessage,
  Events,
  Interaction,
} from 'discord.js';
import { Client } from '../Client';
import { BotEvent } from '../types';

export default class Message implements BotEvent {
  public readonly type = Events.InteractionCreate;
  constructor(private client: Client) {}
  async handleChatInputCommand(interaction: CommandInteraction) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  }
  public async run([interaction]: ClientEvents[this['type']]) {
    interaction.isChatInputCommand() &&
      this.handleChatInputCommand(interaction);
  }
}
