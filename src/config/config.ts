import { ActivityType } from 'discord.js';
import { BotSettings } from '../types/bot/Bot';

export const settings: BotSettings = {
  presence: {
    // activity: {
    //     name: '!help for commands',
    //     type: 'PLAYING'
    // }
    activities: [
      {
        name: '!help for commands',
        // state: 'with the API',
        type: ActivityType.Playing,
      },
    ],
  },
  prefix: '!',
  paths: {
    commands: 'dist/commands',
    events: 'dist/events',
  },
};
