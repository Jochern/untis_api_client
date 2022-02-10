"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.untis = void 0;
const webuntis_1 = __importDefault(require("webuntis"));
const fs_1 = require("fs");
const schedule_1 = require("./src/schedule");
const untis = new webuntis_1.default('Robert-Bosch-Schule', 'Klingjoh', 'Vincent13!', 'perseus.webuntis.com/');
exports.untis = untis;
untis
    .login()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, schedule_1.startSchedule)();
    let table = yield untis.getOwnClassTimetableForToday();
    let cancelledLessons = table.filter((lesson) => lesson.code === 'cancelled');
    let missingTeachers = cancelledLessons.map((lesson) => lesson.te[0].longname);
    logMissingTeachers(missingTeachers);
}));
function logMissingTeachers(teachers) {
    let rawData = (0, fs_1.readFileSync)("./out/data.json", "utf-8");
    let data = JSON.parse(rawData);
    teachers.forEach(teacher => {
        if (data.teachers[teacher]) {
            data.teachers[teacher] = data.teachers[teacher] + 1;
        }
        else {
            data.teachers[teacher] = 1;
        }
    });
    rawData = JSON.stringify(data);
    (0, fs_1.writeFileSync)("./out/data.json", rawData);
}
