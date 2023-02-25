import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

export enum PlayerCommands {
  NONE = "",
  START_PLAYLIST = "startPlaylist",
  PLAY = "play"
}

@Entity()
export class CommandPlayer {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({
    type: "enum",
    enum: PlayerCommands,
    default: PlayerCommands.START_PLAYLIST
  })
  command!: PlayerCommands;

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