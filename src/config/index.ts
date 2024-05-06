import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") }); //cwd is the current working directory

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
