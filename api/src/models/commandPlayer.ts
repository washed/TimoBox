import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

@Entity()
export class CommandPlayer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  command!: string;

  @Column()
  payload!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}