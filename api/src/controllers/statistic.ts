import AppDataSource from "../config/database";
import { CommandExtension, CommandPlayer } from "../models";
import { ExtensionCommands } from "../models/commandExtension";
import { PlayerCommands } from "../models/commandPlayer";

interface GetStatisticResponse {
  connections: {
    extension: ConnectionStatus,
    player: ConnectionStatus
  },
  commands: {
    extension: CommandExtension[],
    player: CommandPlayer[]
  },
  playlists: StatisticPlaylist[]
}

interface ConnectionStatus {
  connected: boolean,
  latency: number
}

interface StatisticPlaylist {
  playlistid: string,
  loadcount: number,
  lastplayed?: Date,
  firstplayed?: Date
}

export default class StatisticController {  

  public async getStatistic(): Promise<GetStatisticResponse> {
    console.log("getStatistic");

    const extensionCommands: CommandExtension[] = await AppDataSource.manager
      .getRepository(CommandExtension)
      .createQueryBuilder("command")
      .orderBy("command.updatedAt", "DESC")
      .getMany();

    const playerCommands: CommandPlayer[] = await AppDataSource.manager
      .getRepository(CommandPlayer)
      .createQueryBuilder("command")
      .orderBy("command.updatedAt", "DESC")
      .getMany();

      const statistic = {
        connections: {
          extension: {
            connected: false,
            latency: 0
          },
          player: {
            connected: false,
            latency: 0
          }
        },
        commands: {
          extension: extensionCommands,
          player: playerCommands
        },
        playlists: []
      };

    this.generateExtensionCommandStats(extensionCommands, statistic);
    this.generatePlayerCommandStats(playerCommands, statistic);

    return statistic
  }

  private generateExtensionCommandStats(extensionCommands: CommandExtension[], statistic: GetStatisticResponse): void {
    const playlistMap: Map<string, StatisticPlaylist> = new Map<string, StatisticPlaylist>();

    if (extensionCommands.length > 0 && extensionCommands[0].executedAt) {
      const latency = this.calcLatency(new Date(), extensionCommands[0].executedAt);
      statistic.connections.extension.latency = latency;
      statistic.connections.extension.connected = latency < 2000 ? true : false;     
    }

    extensionCommands.forEach((command) => {      
      if (command.executed) {
        if(command.command == ExtensionCommands.LOAD_PLAYLIST) {
          const playlistId = command.payload;
  
          if(!playlistMap.has(playlistId)) {
            playlistMap.set(playlistId, {
              playlistid: playlistId,
              loadcount: 0,
            })
          }
  
          const currentStats = playlistMap.get(playlistId);
          currentStats!.loadcount++;
          currentStats!.lastplayed = currentStats!.lastplayed && currentStats!.lastplayed > command.updatedAt ? currentStats!.lastplayed : command.updatedAt;
          currentStats!.firstplayed = currentStats!.firstplayed && currentStats!.firstplayed < command.updatedAt ? currentStats!.firstplayed : command.updatedAt;
        }
      }
    })

    statistic.playlists = Array.from(playlistMap.values());
  }

  private generatePlayerCommandStats(playerCommands: CommandPlayer[], statistic: GetStatisticResponse): void {
    if (playerCommands.length > 0 && playerCommands[0].executedAt) {
      const latency = this.calcLatency(new Date(), playerCommands[0].executedAt);
      statistic.connections.player.latency = latency;
      statistic.connections.player.connected = latency < 2000 ? true : false;
    }
  }

  private calcLatency(date0: Date, date1: Date) : number {
    const latency = date0.getTime() - date1.getTime();
    return latency;
  }
}