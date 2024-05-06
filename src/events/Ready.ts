import { Client } from '../Client';
import { Logger } from '../utils/Logger';
import { BotEvent } from '../types';
import { ClientEvents, Events } from 'discord.js';
export default class Ready implements BotEvent {
  public readonly type = Events.ClientReady;
  constructor(private client: Client) {}
  public async run() {
    if (this.client.user) {
      Logger.info(`${this.client.user.username} is running.`);
      this.client.user.setPresence(this.client.settings.presence);
    }
  }
}
