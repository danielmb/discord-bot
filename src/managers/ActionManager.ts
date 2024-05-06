import { Collection, Command } from 'discord.js';
import { Service } from 'typedi';
import { join } from 'path';
import { readdir, statSync } from 'fs';
import { BotClient, BotEvent } from '../types/bot/Bot';
import { Logger } from '../utils/Logger';

@Service()
export class ActionManager {
  public commands: Collection<string, Command> = new Collection<
    string,
    Command
  >();

  /**
   * Parses files into commands from the configured command path.
   * @param {BotClient} client The original client, for access to the configuration.
   * @returns {Collection<string, Command>} A dictionary of every command in a [name, object] pair.
   */
  public initializeCommands(client: BotClient): void {
    const { commands } = client.settings.paths;

    readdir(commands, (err, files) => {
      if (err) Logger.error(err);

      files.forEach((cmd) => {
        if (statSync(join(commands, cmd)).isDirectory()) {
          this.initializeCommands(client);
        } else {
          const command: Command = require(
            join(__dirname, '../../', `${commands}/${cmd.replace('ts', 'js')}`),
          );

          client.commands.set(command.data.name, command);
          // const command = new Command(client);

          // this.commands.set(command.conf.name, command);
        }
      });
    });
  }

  /**
   * Initializes every event from the configured event path.
   * @param {BotClient} client The original client, for access to the configuration.
   */
  public initializeEvents(client: BotClient): void {
    const { events } = client.settings.paths;

    readdir(events, (err, files) => {
      Logger.info(`Loading ${files.length} events...`);
      if (err) Logger.error(err);

      files.forEach((evt) => {
        Logger.info(`Loading event: ${evt}`);

        const Event: any = require(
          join(__dirname, '../../', `${events}/${evt.replace('ts', 'js')}`),
        ).default;

        const event = new Event(client) as BotEvent;
        const eventName = event.type;
        Logger.info(`Event loaded: ${eventName}`);
        console.log(event);
        client.on(eventName, (...args: any[]) => event.run(args));
      });
    });
  }
}
