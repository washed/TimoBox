import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

@Entity()
export class CommandExtension {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  command!: string;

  @Column()
  payload!: string;

  @Column()
  executed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}