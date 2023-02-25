import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

export enum ExtensionCommands {
  NONE = "",
  LOAD_PLAYLIST = "loadPlaylist"
}
  
@Entity()
export class CommandExtension {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: ExtensionCommands,
    default: ExtensionCommands.LOAD_PLAYLIST
  })
  command!: ExtensionCommands;

  @Column()
  payload!: string;

  @Column()
  executed!: boolean;

  @Column()
  executedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}