import AppDataSource from "../config/database";
import { ConnectionStatus } from "../models/connectionstatus";

interface GetConnectionStatusResponse {
  status: ConnectionStatus
}

interface SetConnectionStatusResponse {
  success: boolean
}

export default class ConnectionController {
  public async getConnectionStatus(): Promise<GetConnectionStatusResponse> {
    console.log("getConnectionStatus");

    let connectionStatus: ConnectionStatus | null = await AppDataSource.manager
      .getRepository(ConnectionStatus)
      .createQueryBuilder("status")
      .where("status.id = :id", { id: 1 })
      .getOne();

    if (!connectionStatus) {
      connectionStatus = new ConnectionStatus();
    }

    return {
      status: connectionStatus
    };
  }

  public async setConnectionStatus(): Promise<SetConnectionStatusResponse> {
    console.log("setConnectionStatus");

    let connectionStatus: ConnectionStatus = new ConnectionStatus();
    connectionStatus = await AppDataSource.manager.save(connectionStatus);
    return {
      success: connectionStatus.id ? true : false
    };
  }
}