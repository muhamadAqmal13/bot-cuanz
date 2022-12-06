import createLog from "./createLog.js";
import readlineSync from 'readline-sync';
import { checkUsername, getDataFake, getOtp, getToken, saveRefferal, saveUsername, validateOtp } from "./service.js";
import randomatic from "randomatic";

(async()=> {
    const refferal_code = "malmalaq";
    let ulang = readlineSync.question('Mau ulang berapa kali? : ')
    if(isNaN(ulang * 10)){
        createLog('Contol Isi angka')
        console.log()
        ulang = readlineSync.question('Mau ulang berapa kali? : ')
        return
    }

    
    createLog('START', 'yellow')
    let i = 0
    while(i < 10){
        try {
            const dataFake = await getDataFake()
            console.log()
            createLog(`Start ke ${i + 1}`, 'yellow')
            let mobile_phone = readlineSync.question('Masukkan no hp : (Contoh: 891234567891) ')
            if(!mobile_phone || isNaN(mobile_phone * 1)){
                createLog(`No Hp tidak valid`, 'red')
                continue;
            }

            console.log()
            createLog(`Process get otp`)
            const verif = await getOtp(mobile_phone)
            if(verif.code !== 'OK'){
                createLog(`Something wrong with mobile phone`)
                console.log(verif)
                break;
            }
            createLog(`Success get OTP`)

            console.log()
            const otp = readlineSync.question('Masukkan OTP : ')
            const validate = await validateOtp(mobile_phone, otp)
            if(validate.code !== 'OK'){
                createLog(`OTP Tidak valid`)
                console.log(validate)
                continue;
            }
            createLog(`OTP Valid`)
            console.log()
            // console.log()
            // createLog(`Process Auth Token`)
            // const authToken = await getToken(validate.data.firebase_access_token)
            // if(typeof authToken.token === 'undefined') {
            //     createLog(`Something wrong with firebase token`)
            //     console.log(authToken)
            //     continue;
            // }
            // createLog(`Success auth Token`)

            const username = `${randomatic('Aa', 2)}${dataFake.username}${randomatic(`a0`, 2)}`
            createLog(`Username yang digunakan : ${username}`)
            console.log()
            createLog(`Process Cek Username`)
            const check = await checkUsername(validate.data.access_token, username)
            if(check.code !== 'NOT_FOUND'){
                createLog(`Something wrong with username`)
                createLog(check.message.id, 'red')
                continue;
            }
            createLog(`Username bisa digunakan`)

            console.log()
            createLog(`Process validasi username`)
            const validateUsername = await saveUsername(validate.data.access_token, username)
            if(validateUsername.message !== 'success') {
                createLog(`Something wrong with username`)
                console.log(validateUsername)
                continue;
            }
            createLog(`Berhasil memvalidasi username`)

            console.log()
            createLog(`Process validasi kode referral`)
            const validateRefferal = await saveRefferal(validate.data.access_token, refferal_code)
            if(validateRefferal.code !== 'OK') {
                createLog(`Something wrong with refferal`)
                console.log(validateRefferal)
                continue;
            }
            createLog(`Berhasil memvalidasi kode referral`)
            i++
            createLog(`Berhasil nuyul ke ${i}`)
        } catch (err) { 
            createLog(err.message, 'red')
        }
    }
})()