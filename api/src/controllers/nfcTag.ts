import AppDataSource from "../config/database";
import { NfcTag } from "../models";
import { CommandType } from "../models/nfctag";
import CommandExtensionController from "./commandExtension";
import CommandPlayerController from "./commandPlayer";

interface GetNfcTagResponse {
  tagid: string;
  commandtype: CommandType,
  command: string;
  payload: any;
}

interface GetNfcTagsResponse {
  tags: NfcTag[]
}

interface SetNfcTagRequest {
  tagid: string;
  commandtype: CommandType,
  command: string;
  payload: any;
}

interface SetNfcTagResponse {
  success: boolean;
}

interface ExecuteNfcTagResponse {
  success: boolean;
}

export default class NfcTagController {
  private emptyNfcTag: SetNfcTagRequest = {
    tagid: "",
    commandtype: CommandType.EXTENSION,
    command: "",
    payload: ""
  }

  public async getNfcTag(tagId: string): Promise<GetNfcTagResponse> {
    console.log("getNfcTag");
    const nfcTag: NfcTag | null = await AppDataSource.manager
      .getRepository(NfcTag)
      .createQueryBuilder("tag")
      .where("tag.tagid = :tagId", { tagId })
      .getOne();

    console.log(nfcTag);
    
    if (nfcTag) {      
      return nfcTag;
    }

    return this.emptyNfcTag;
  }

  public async getNfcTags(): Promise<GetNfcTagsResponse> {
    console.log("getNfcTags");
    const nfcTags: NfcTag[] = await AppDataSource.manager
      .getRepository(NfcTag)
      .createQueryBuilder("tag")
      .getMany();

    console.log(nfcTags);
    
    return {
      tags: nfcTags
    };
  }

  public async setNfcTag(request: SetNfcTagRequest): Promise<SetNfcTagResponse> {
    console.log("setNfcTag");

    let nfcTag: NfcTag | null = await AppDataSource.manager
      .getRepository(NfcTag)
      .createQueryBuilder("tag")
      .where("tag.tagid = :tagId", { tagId: request.tagid })
      .getOne();

    if (!nfcTag) {
      nfcTag = new NfcTag();
    }

    nfcTag.tagid = request.tagid;
    nfcTag.commandtype = request.commandtype;
    nfcTag.command = request.command;
    nfcTag.payload = request.payload;

    await AppDataSource.manager.save(nfcTag);
    return {
      success: true,
    };
  }

  public async executeNfcTag(tagId: string): Promise<ExecuteNfcTagResponse> {
    console.log("getNfcTag");
    const nfcTag: NfcTag | null = await AppDataSource.manager
      .getRepository(NfcTag)
      .createQueryBuilder("tag")
      .where("tag.tagid = :tagId", { tagId })
      .getOne();

    console.log(nfcTag);
    
    if (nfcTag) {      
      const commandRequest = {
        command: nfcTag.command,
        payload: nfcTag.payload
      }
      switch(nfcTag.commandtype) {
        case CommandType.EXTENSION:
          return await new CommandExtensionController().setCurrentCommand(commandRequest);   
        case CommandType.PLAYER:          
          return await new CommandPlayerController().setCurrentCommand(commandRequest);
      }
    }

    return {
      success: false,
    };
  }
}