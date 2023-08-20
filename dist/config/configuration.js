"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    PORT: +process.env.PORT || 7000,
    database: {
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        db: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    }
};
//# sourceMappingURL=configuration.js.map