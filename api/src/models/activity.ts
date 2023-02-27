import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
  } from "typeorm";
import { Command } from "./command";
import { NfcTag } from "./nfctag";


export enum ActivityType {
  NONE = "",
  COMMAND_EXECUTED = "COMMAND_EXECUTED",
  TAG_UPDATED = "TAG_UPDATED",
  TAG_EXECUTED = "TAG_EXECUTED"
}
  
@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: ActivityType,
    default: ActivityType.NONE
  })
  type!: ActivityType;

  @ManyToOne(type => Command)
  @JoinColumn()
  command?: Command

  @ManyToOne(type => NfcTag)
  @JoinColumn()
  tag?: NfcTag

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}