import AppDataSource from "../config/database";
import { CommandExtension } from "../models";

interface GetExtensionCommandResponse {
  command: string;
  payload: any;
}

interface SetExtensionCommandRequest {
  command: string;
  payload: any;
}
interface SetExtensionCommandResponse {
  success: boolean;
}

export default class CommandExtensionController {
  private emptyCommand: SetExtensionCommandRequest = {
    command: "",
    payload: ""
  }

  public async getCurrentCommand(): Promise<GetExtensionCommandResponse> {
    console.log("getCurrentCommand");
    const lastCommand: CommandExtension | null = await AppDataSource.manager
      .getRepository(CommandExtension)
      .createQueryBuilder("command")
      .orderBy("command.id", "DESC").getOne();

      console.log(lastCommand);
      
      if (lastCommand && !lastCommand.executed) {
        const returnCommand = {
          command: lastCommand.command,
          payload: lastCommand.payload
        };

        lastCommand.executed = true;
        AppDataSource.manager.save(lastCommand);
        
        return returnCommand;
      }

    return this.emptyCommand;
  }

  public async setCurrentCommand(request: SetExtensionCommandRequest): Promise<SetExtensionCommandResponse> {
    console.log("setCurrentCommand");
    const commandExtension = new CommandExtension();
    commandExtension.command = request.command;
    commandExtension.payload = request.payload;
    commandExtension.executed = false;
    
    await AppDataSource.manager.save(commandExtension);
    return {
      success: true,
    };
  }
}