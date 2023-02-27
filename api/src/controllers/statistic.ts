import AppDataSource from "../config/database";
import { CommandExtension } from "../models";
import { ExtensionCommands } from "../models/commandExtension";

interface GetStatisticResponse {
  connection: ConnectionStatus,
  commands: CommandExtension[],
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

      const statistic = {
        connection: {
          connected: false,
          latency: 0
        },
        commands: extensionCommands,
        playlists: []
      };

    this.generateExtensionCommandStats(extensionCommands, statistic);

    return statistic
  }

  private generateExtensionCommandStats(extensionCommands: CommandExtension[], statistic: GetStatisticResponse): void {
    const playlistMap: Map<string, StatisticPlaylist> = new Map<string, StatisticPlaylist>();

    if (extensionCommands.length > 0 && extensionCommands[0].executedAt) {
      const latency = this.calcLatency(new Date(), extensionCommands[0].executedAt);
      statistic.connection.latency = latency;
      statistic.connection.connected = latency < 2000 ? true : false;     
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

  private calcLatency(date0: Date, date1: Date) : number {
    const latency = date0.getTime() - date1.getTime();
    return latency;
  }
}