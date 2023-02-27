import AppDataSource from "../config/database";
import { Command } from "../models";
import { ActivityType } from "../models/activity";
import { Commands } from "../models/command";
import ActivityController from "./activity";
import ConnectionController from "./connection";

interface GetExtensionCommandResponse {
  command: Commands;
  payload: any;
  executed: boolean;
  executedAt: Date;
}

interface SetExtensionCommandRequest {
  command: any;
  payload: any;
  executed: boolean;
  executedAt: Date;
}
interface SetExtensionCommandResponse {
  success: boolean;
}

export default class CommandController {
  private emptyCommand: SetExtensionCommandRequest = {
    command: Commands.NONE,
    payload: "",
    executed: true,
    executedAt: new Date()
  }

  public async getCurrentCommand(): Promise<GetExtensionCommandResponse> {
    console.log("getCurrentCommand");
    const lastCommand: Command | null = await AppDataSource.manager
      .getRepository(Command)
      .createQueryBuilder("command")
      .where('command.executed = false')
      .orderBy("command.id", "DESC").getOne();

      new ConnectionController().setConnectionStatus();
      
      if (!lastCommand) {
        return this.emptyCommand;        
      }

      lastCommand.executed = true;
      lastCommand.executedAt = new Date();
      AppDataSource.manager.save(lastCommand);

      new ActivityController().addActivityCommand(lastCommand, ActivityType.COMMAND_EXECUTED);

      return lastCommand;
  }

  public async setCurrentCommand(request: SetExtensionCommandRequest): Promise<SetExtensionCommandResponse> {
    console.log("setCurrentCommand");
    const command = new Command();
    command.command = request.command;
    command.payload = request.payload;
    command.executed = false;
    command.executedAt = new Date(0);
    
    const savedCommand = await AppDataSource.manager.save(command);
    return {
      success: savedCommand.id ? true : false,
    };
  }
}