import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';
import { BotClient } from '../types';

// export default class Ping extends Command {
//     constructor(client: BotClient) {
//         super(client, {
//             name: 'ping',
//             description: 'Pings the bot.',
//             category: 'Information',
//             usage: client.settings.prefix.concat('ping'),
//             cooldown: 1000,
//             requiredPermissions: ['SEND_MESSAGES']
//         });
//     }

//     public async run(message: Message): Promise<void> {
//         await super.respond(message.channel, 'Pong!');
//     }
// }

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

export async function execute(interaction: CommandInteraction) {
  await interaction.reply('Pong!');
}
