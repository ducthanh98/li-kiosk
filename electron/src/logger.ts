import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({
            filename: 'li-kiosk.log',
            maxsize: 10 * 1024 * 1024, // Kích thước tối đa của file log là 10MB
            maxFiles: 20,  // Giới hạn số lượng file log cũ giữ lại
        }),
        new winston.transports.Console()
    ]
});

export default logger