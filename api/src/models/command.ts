import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

export enum Commands {
  NONE = "",
  LOAD_PLAYLIST = "LOAD_PLAYLIST",
  MEDIA_PLAY_PAUSE = "MEDIA_PLAY_PAUSE",
  MEDIA_PREV = "MEDIA_PREV",
  MEDIA_NEXT = "MEDIA_NEXT"
}
  
@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: Commands,
    default: Commands.LOAD_PLAYLIST
  })
  command!: Commands;

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