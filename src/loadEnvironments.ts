import dotenv from "dotenv";

dotenv.config();

const enviroment = {
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  mongoDbUrl: process.env.MONGODB_URL,
  debug: process.env.DEBUG,
};

export default enviroment;
