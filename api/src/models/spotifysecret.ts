import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
@Entity()
export class SpotifySecret {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  clientid!: string;

  @Column()
  clientsecret!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}