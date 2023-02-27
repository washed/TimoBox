import AppDataSource from "../config/database";
import { Command } from "../models";
import { Commands } from "../models/command";
import { ConnectionStatus } from "../models/connectionstatus";

interface GetStatisticResponse {
  connection: Connection,
  commands: Command[],
  playlists: StatisticPlaylist[]
}

interface Connection {
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

    const commands: Command[] = await AppDataSource.manager
      .getRepository(Command)
      .createQueryBuilder("command")
      .orderBy("command.updatedAt", "DESC")
      .getMany();

      const statistic = {
        connection: {
          connected: false,
          latency: 0
        },
        commands: commands,
        playlists: []
      };

    this.generateExtensionCommandStats(commands, statistic);

    const connectionStatusList: ConnectionStatus[] = await AppDataSource.manager
      .getRepository(ConnectionStatus)
      .createQueryBuilder('status')
      .limit(2)
      .orderBy('status.updatedAt', 'DESC')
      .getMany();

    if (connectionStatusList.length > 1) {
      const latency = connectionStatusList[0].createdAt.getTime() - connectionStatusList[1].createdAt.getTime();
      statistic.connection.latency = latency;
      statistic.connection.connected = latency < 2000 ? true : false;     
    }

    return statistic
  }

  private generateExtensionCommandStats(commands: Command[], statistic: GetStatisticResponse): void {
    const playlistMap: Map<string, StatisticPlaylist> = new Map<string, StatisticPlaylist>();

    if (commands.length > 0 && commands[0].executedAt) {
      const latency = this.calcLatency(new Date(), commands[0].executedAt);
      statistic.connection.latency = latency;
      statistic.connection.connected = latency < 2000 ? true : false;     
    }

    commands.forEach((command) => {      
      if (command.executed) {
        if(command.command == Commands.LOAD_PLAYLIST) {
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