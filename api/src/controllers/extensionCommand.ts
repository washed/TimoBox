interface GetExtensionCommandResponse {
  command: string;
}

interface SetExtensionCommandRequest {
  command: string;
  payload: any;
}
interface SetExtensionCommandResponse {
  success: boolean;
}

export default class ExtensionCommandController {
  private emptyCommand : SetExtensionCommandRequest = {
    command: "",
    payload: ""
  }

  public async getCurrentCommand(): Promise<GetExtensionCommandResponse> {
    const fs = require('fs');
    let rawdata = fs.readFileSync('extensionCommand.json');
    let command = JSON.parse(rawdata);

    this.setCurrentCommandFile(this.emptyCommand);

    return command;
  }

  public async setCurrentCommand(request: SetExtensionCommandRequest): Promise<SetExtensionCommandResponse> {    
    this.setCurrentCommandFile(request)
    return {
      success: true,
    };
  }

  private setCurrentCommandFile(command: SetExtensionCommandRequest): boolean {
    const fs = require('fs');
    let data = JSON.stringify(command);
    return fs.writeFileSync('extensionCommand.json', data, { flag: 'w' });
  }
}