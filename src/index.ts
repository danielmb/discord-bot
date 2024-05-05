import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const command = message.content.split(' ')[0];

  if (command === '!test') {
    message.reply('Hello, world!');
  }
});
//
