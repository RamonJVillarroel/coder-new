require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  TWITTER_API_KEY: process.env.TWITTER_API_KEY || '',
  TWITTER_API_SECRET: process.env.TWITTER_API_SECRET || '',
}