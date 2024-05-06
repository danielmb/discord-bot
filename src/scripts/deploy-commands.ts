import {
  Command,
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { env } from '../config/env';
const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

const commandsPath = path.join(__dirname, '..', 'commands');
const commandFiles: string[] = fs
  .readdirSync(commandsPath)
  .filter((file): boolean => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath) as Command;
  if (!command) {
    console.error(`Command ${file} is missing`);
    continue;
  }
  if (!('name' in command.data) || !('description' in command.data)) {
    console.error(`Command ${file} is missing name or description`);
    continue;
  }
  if (!('execute' in command)) {
    console.error(`Command ${file} is missing execute`);
    continue;
  }
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN);
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    const data = rest.put(Routes.applicationCommands(env.DISCORD_CLIENT_ID), {
      body: commands,
    });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
