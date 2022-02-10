import WebUntis from "webuntis";
import { readFileSync,writeFile, writeFileSync } from "fs";

import { startSchedule } from "./src/schedule";

const untis = new WebUntis('Robert-Bosch-Schule', 'Klingjoh', 'Vincent13!', 'perseus.webuntis.com/');

untis
    .login()
    .then(async () => {
        startSchedule()
        let table = await untis.getOwnClassTimetableForToday()

        let cancelledLessons = table.filter((lesson) => lesson.code === 'cancelled')
        let missingTeachers = cancelledLessons.map((lesson) => lesson.te[0].longname)

        logMissingTeachers(missingTeachers)
    })

function logMissingTeachers(teachers: string[]) {
    let rawData = readFileSync("./out/data.json","utf-8")
    let data = JSON.parse(rawData)

    teachers.forEach(teacher => {
        if(data.teachers[teacher]){
            data.teachers[teacher] = data.teachers[teacher]+1
        }else{
            data.teachers[teacher] = 1
        }
    })

    rawData = JSON.stringify(data)
    writeFileSync("./out/data.json",rawData)
}

export { untis };