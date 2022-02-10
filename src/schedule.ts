import schedule from 'node-schedule'
//@ts-ignore
import { untis } from '../main'

const jobTime = '54 * * * *'

export function startSchedule():void{
    const job = schedule.scheduleJob('mainJob',jobTime,async (fireDate) => {
        let table = await untis.getOwnClassTimetableForToday()
        for (const lesson of table) {
           if(lesson.code === 'cancelled'){
               console.log(lesson)
           }
        }
    })    
}




