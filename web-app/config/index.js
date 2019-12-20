const convict = require("convict");
const fs = require("fs");

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "qa", "stage", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 4000,
    env: "PORT"
  },
  jwtSecret: {
    doc: 'JWT Token secret',
    format: String,
    default: 'this-is-my-jwt-secret',
    env: 'JWT_SECRET',
  },
  debug: {
    format: Boolean,
    default: true,
    env: 'DEBUG',
  },
  db: {
    username: {
      format: String,
      default: "postgres",
      env: 'DB_USERNAME',
    },
    password: {
      format: String,
      default: "",
      env: 'DB_PASSWORD',
    },
    database: {
      format: String,
      default: "postgres",
      env: 'DB_DATABASE',
    },
    postgresConf: {
      host: {
        doc: "Database host name/IP",
        format: String,
        default: "localhost",
        env: 'DB_HOST',
      },
      dialect: {
        doc: "Dialect of database",
        format: String,
        default: "postgres",
        env: 'DB_DIALECT',
      },
      port: {
        doc: "port for connection",
        format: "port",
        default: 5432,
        env: 'DB_PORT',
      },
      logging: {
        format: Boolean,
        default: false,
        env: 'DB_LOGGING',
      }
    }
  },
  redis: {
    host: {
      doc: "Redis host name/IP",
      format: String,
      default: "localhost",
      env: 'REDIS_HOST',
    },
    port: {
      doc: "port for connection",
      format: "port",
      default: 6379,
      env: 'REDIS_PORT',
    }
  },
});

const env = config.get("env");
try {
  const path = `${__dirname}/${env}.json`;
  fs.accessSync(path, fs.constants.F_OK);

  config.loadFile(path);
} catch (error) {
  console.error("file doesn't exist, loading defaults");
}

config.validate({ allowed: "strict" });

module.exports = { config };
