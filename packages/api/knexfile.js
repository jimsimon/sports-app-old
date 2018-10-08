// Update with your config settings.

module.exports = {
  "development": {
    "client": "pg",
    "connection": {
      "user": "postgres",
      "password": null,
      "host": "db",
      "port": 5432,
      "database": "sportsapp"
    },
    "pool": {
      "min": 2,
      "max": 10
    },
    "debug": true
  },
  "production": {
    "client": "pg",
    "connection": {
      "user": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "database": "sportsapp"
    },
    "pool": {
      "min": 2,
      "max": 10
    },
    "debug": true
  }
}
