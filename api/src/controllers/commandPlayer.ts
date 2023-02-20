interface GetCommandResponse {
  command: string;
}

interface SetCommandRequest {
  command: string;
}
interface SetCommandResponse {
  success: boolean;
}

export default class CommandPlayerController {
  private emptyCommand : SetCommandRequest = {
    command: ""
  }

  public async getCurrentCommand(): Promise<GetCommandResponse> {
    const fs = require('fs');
    let rawdata = fs.readFileSync('command.json');
    let command = JSON.parse(rawdata);

    this.setCurrentCommandFile(this.emptyCommand);

    return command;
  }

  public async setCurrentCommand(request: SetCommandRequest): Promise<SetCommandResponse> {    
    this.setCurrentCommandFile(request)
    return {
      success: true,
    };
  }

  private setCurrentCommandFile(command: SetCommandRequest): boolean {
    const fs = require('fs');
    let data = JSON.stringify(command);
    return fs.writeFileSync('command.json', data, { flag: 'w' });
  }
}