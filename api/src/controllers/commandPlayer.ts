import AppDataSource from "../config/database";
import { CommandPlayer } from "../models";

interface GetCommandResponse {
  command: string;
  payload: string;
}

interface SetCommandRequest {
  command: string;
  payload: string;
}
interface SetCommandResponse {
  success: boolean;
}

export default class CommandPlayerController {
  private emptyCommand: SetCommandRequest = {
    command: "",
    payload: ""
  }

  public async getCurrentCommand(): Promise<GetCommandResponse> {
    console.log("getCurrentCommand");
    const lastCommand: CommandPlayer | null = await AppDataSource.manager
      .getRepository(CommandPlayer)
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

  public async setCurrentCommand(request: SetCommandRequest): Promise<SetCommandResponse> {
    console.log("setCurrentCommand");
    const commandExtension = new CommandPlayer();
    commandExtension.command = request.command;
    commandExtension.payload = request.payload;
    commandExtension.executed = false;
    
    await AppDataSource.manager.save(commandExtension);
    return {
      success: true,
    };
  }
}