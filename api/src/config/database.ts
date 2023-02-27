import { DataSource } from "typeorm";
import { Activity, Command, NfcTag } from "../models";
import { ConnectionStatus } from "../models/connectionstatus";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [
    Command,
    NfcTag,
    ConnectionStatus,
    Activity
  ],
  synchronize: true,
});

export default AppDataSource;