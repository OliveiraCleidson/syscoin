import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}] ${timestamp} ${level}: ${message}`;
});

export const loggerFactory = () =>
  winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "app" },
    transports: [
      new winston.transports.File({
        filename: path.resolve(
          path.dirname(__filename),
          "..",
          "logs",
          `all-${new Date().toISOString()}.log`
        ),
      }),
      new winston.transports.File({
        filename: path.resolve(
          path.dirname(__filename),
          "..",
          "logs",
          `error-${new Date().toISOString()}.log`
        ),
        level: "error",
      }),
      new winston.transports.Console({
        level: "info",
        format: combine(label({ label: "SysCoin" }), timestamp(), myFormat),
      }),
    ],
  });
