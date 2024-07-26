import 'dotenv/config'

export const config = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB: {
    NAME: process.env.DB_NAME,
    PORT: Number(process.env.DB_PORT),
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
  }
}