import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
  } from "typeorm";
import { Commands } from "./command";

export enum CommandType {
  PLAYER = "player",
  EXTENSION = "extension"
}

@Entity()
export class NfcTag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @PrimaryColumn()
  tagid!: string;

  @Column({
    type: "enum",
    enum: CommandType,
    default: CommandType.EXTENSION
  })
  commandtype!: CommandType;

  @Column()
  command!: Commands;

  @Column()
  payload!: string;

  @Column()
  executedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}