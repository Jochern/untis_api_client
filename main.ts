import WebUntis from "webuntis";
import dotenv from "dotenv"

dotenv.config()

import { startSchedule } from "./src/schedule";
const untis = new WebUntis(process.env.SCHOOL!, process.env.USER_NAME!, process.env.PASSWORD!, process.env.LINK!);

untis
    .login()
    .then(() => {
        startSchedule()
    })

export { untis };