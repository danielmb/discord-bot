import {
  Client,
  TextChannel,
  DMChannel,
  PresenceData,
  ClientOptions,
  Guild,
  User,
  Collection,
  NewsChannel,
  PermissionsString,
  Embed,
  MessagePayload,
  MessageCreateOptions,
  Command,
  Events,
  ClientEvents,
} from 'discord.js';

export interface BotClient extends Client {
  settings: BotSettings;
  commands: Collection<string, Command>;
}

export interface CommandOptions {
  name: string;
  description?: string;
  usage?: string;
  category?: string;
  cooldown: number;
  requiredPermissions: PermissionsString[];
}

export interface BotSettings {
  presence: PresenceData;
  clientOptions?: ClientOptions;
  token?: string;
  prefix: string;
  paths: {
    commands: string;
    events: string;
  };
}

// export interface BotEvent {
//   type: keyof ClientEvents;
//   run(args?: any[]): void;
// }
// export interface BotEvent<T extends keyof ClientEvents = keyof ClientEvents> {
//   type: T;
//   // run(args?: any[]): void;
//   run: ClientEvents[T];
// }

// try again
export interface BotEvent<T extends keyof ClientEvents = keyof ClientEvents> {
  type: T;
  // run: (args: ClientEvents[T]) => void;
  run: (args?: any) => void;
}

export interface UserCooldown {
  user: User;
  guild: Guild;
}

export type AnyChannel = TextChannel | DMChannel | NewsChannel;
export type EmbedOrMessage = MessagePayload | string | MessageCreateOptions;
