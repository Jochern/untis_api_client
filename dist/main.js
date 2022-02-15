"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.untis = void 0;
const webuntis_1 = __importDefault(require("webuntis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const schedule_1 = require("./src/schedule");
console.log(process.env);
const untis = new webuntis_1.default(process.env.SCHOOL, process.env.USER_NAME, process.env.PASSWORD, process.env.LINK);
exports.untis = untis;
untis
    .login()
    .then(() => {
    (0, schedule_1.startSchedule)();
});
