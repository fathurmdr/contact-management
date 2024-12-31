import os from "os";
import winston from "winston";

const { combine, timestamp, json } = winston.format;

export const hostnameTransform = (info: winston.Logform.TransformableInfo) => {
  info.hostname = os.hostname();
  return info;
};

const hostname = () => winston.format(hostnameTransform)();

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), hostname(), json({})),
  transports: [new winston.transports.Console({})],
});

export default logger;
