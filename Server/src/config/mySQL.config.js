import dotenv from "dotenv"
dotenv.config()

const dbConfig = {
    db: {
        host: process.env.MYSQL_HOST,
        user: 'candidate',
        password: process.env.MYSQL_PASSWORD,
        database: 'capstone_2324_candidate'
    }
}

export default dbConfig;