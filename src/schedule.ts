import schedule, { Job } from 'node-schedule'
import { untis } from '../main'
import { readFileSync, writeFile, writeFileSync } from "fs";


const jobTime = '54 * * * *'

let job:Job

export function startSchedule(): void {
    job = schedule.scheduleJob('mainJob', jobTime, async (fireDate) => {
        let table = await untis.getOwnClassTimetableForToday()

        let cancelledLessons = table.filter((lesson) => lesson.code === 'cancelled')
        let missingTeachers = cancelledLessons.map((lesson) => lesson.te[0].longname)

        logMissingTeachers(missingTeachers)
    })
}

export function stopSchedule():void{
    job.cancel()
}

function logMissingTeachers(teachers: string[]) {
    let rawData = readFileSync("./out/data.json", "utf-8")
    let data = JSON.parse(rawData)

    teachers.forEach(teacher => {
        if (data.teachers[teacher]) {
            data.teachers[teacher] = data.teachers[teacher] + 1
        } else {
            data.teachers[teacher] = 1
        }
    })

    rawData = JSON.stringify(data)
    writeFileSync("./out/data.json", rawData)
}




