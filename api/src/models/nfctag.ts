import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
  } from "typeorm";

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
  command!: string;

  @Column()
  payload!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @UpdateDateColumn()
  executedAt!: Date;
}