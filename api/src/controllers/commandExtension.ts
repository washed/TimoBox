import AppDataSource from "../config/database";
import { CommandExtension } from "../models";
import { ExtensionCommands } from "../models/commandExtension";

interface GetExtensionCommandResponse {
  command: ExtensionCommands;
  payload: any;
}

interface SetExtensionCommandRequest {
  command: any;
  payload: any;
}
interface SetExtensionCommandResponse {
  success: boolean;
}

export default class CommandExtensionController {
  private emptyCommand: SetExtensionCommandRequest = {
    command: ExtensionCommands.NONE,
    payload: ""
  }

  public async getCurrentCommand(): Promise<GetExtensionCommandResponse> {
    console.log("getCurrentCommand");
    const lastCommand: CommandExtension | null = await AppDataSource.manager
      .getRepository(CommandExtension)
      .createQueryBuilder("command")
      .orderBy("command.id", "DESC").getOne();

      console.log(lastCommand);
      
      if (lastCommand) {
        if (lastCommand.executed) {
          lastCommand.executedAt = new Date();
          AppDataSource.manager.save(lastCommand);
        } else {
          const returnCommand = {
            command: lastCommand.command,
            payload: lastCommand.payload
          };
  
          lastCommand.executed = true;
          lastCommand.executedAt = new Date();
          AppDataSource.manager.save(lastCommand);
          
          return returnCommand;
        }
      }

    return this.emptyCommand;
  }

  public async setCurrentCommand(request: SetExtensionCommandRequest): Promise<SetExtensionCommandResponse> {
    console.log("setCurrentCommand");
    const command = new CommandExtension();
    command.command = request.command;
    command.payload = request.payload;
    command.executed = false;
    command.executedAt = new Date(0);
    
    await AppDataSource.manager.save(command);
    return {
      success: true,
    };
  }
}