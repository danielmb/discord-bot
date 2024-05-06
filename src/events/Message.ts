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
  public readonly type = Events.MessageCreate;

  public async run([message]: ClientEvents[this['type']]) {
    console.log(message.content);
  }
}
