require('dotenv').config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, APP_ENV } = process.env;

module.exports = {
  [APP_ENV]: {
    'username': DB_USERNAME,
    'password': DB_PASSWORD,
    'database': DB_NAME,
    'host': DB_HOST,
    'port': DB_PORT,
    'dialect': 'postgres'
  }
};
