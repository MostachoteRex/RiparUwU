import dotenv from "dotenv"

dotenv.config()

const variables = {
    EXPRESS_PORT: process.env.EXPRESS_PORT,
    EXPRESS_HOST: process.env.EXPRESS_HOST,
    DATABASE: process.env.DATABASE,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    TOKEN_SECRETO: process.env.TOKEN_SECRETO
}

export {variables}