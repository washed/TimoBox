import AppDataSource from "../config/database";
import { CommandPlayer } from "../models";
import { PlayerCommands } from "../models/commandPlayer";

interface GetCommandResponse {
  command: PlayerCommands;
  payload: string;
}

interface SetCommandRequest {
  command: any;
  payload: string;
}
interface SetCommandResponse {
  success: boolean;
}

export default class CommandPlayerController {
  private emptyCommand: SetCommandRequest = {
    command: PlayerCommands.NONE,
    payload: ""
  }

  public async getCurrentCommand(): Promise<GetCommandResponse> {
    console.log("getCurrentCommand");
    const lastCommand: CommandPlayer | null = await AppDataSource.manager
      .getRepository(CommandPlayer)
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

  public async setCurrentCommand(request: SetCommandRequest): Promise<SetCommandResponse> {
    console.log("setCurrentCommand");
    const command = new CommandPlayer();
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