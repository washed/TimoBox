import { DataSource } from "typeorm";
import { CommandExtension, CommandPlayer, NfcTag } from "../models";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [
    CommandExtension,
    CommandPlayer,
    NfcTag
  ],
  synchronize: true,
});

export default AppDataSource;