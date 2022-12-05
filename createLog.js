import chalk from "chalk";
import moment from "moment";

const createLog = (msg, color = 'white') => {
    let c = `${color}Bright`
    console.log(`[ ${moment().format('HH-mm-ss')} ] ${chalk[c](msg)}`)
}
export default createLog