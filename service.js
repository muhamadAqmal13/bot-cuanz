import fetch from "node-fetch";

const getOtp = (mobile_phone) => new Promise((resolve, reject) => {
    fetch(`https://accounts-svc.cuanz.com/api/accounts/otp`, {
        method: "POST",
        headers: {
            Host: "accounts-svc.cuanz.com",
            "X-Source": "ios",
            "X-Lang": "id",
            "X-App-Version": "1.32.0",
            "X-App-Debug": true,
            "X-App-Utc-Offset": 8,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identifier_type: "PHONE_NUMBER",
            user_identifier: "+62" + mobile_phone
        })
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(res => reject(res))
});

const validateOtp = (mobile_phone, otp) => new Promise((resolve, reject) => {
    fetch(`https://accounts-svc.cuanz.com/api/accounts/otp/validate`, {
        method: "POST",
        headers: {
            Host: "accounts-svc.cuanz.com",
            "X-Source": "ios",
            "X-Lang": "id",
            "X-App-Version": "1.32.0",
            "X-App-Debug": true,
            "X-App-Utc-Offset": 8,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identifier_type: "PHONE_NUMBER",
            user_identifier: "+62" + mobile_phone,
            otp,
        })
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(res => reject(res))
});

const getToken = (firebase_token) => new Promise((resolve, reject) => {
    fetch(`https://backend.joincuanz.com/tokens`, {
        method: "POST",
        headers: {
            Host: "backend.joincuanz.com",
            "X-Source": "ios",
            "X-Lang": "id",
            "X-App-Version": "1.32.0",
            "X-App-Debug": true,
            "X-App-Utc-Offset": 8,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firebase_token
        })
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(res => reject(res))
});

const checkUsername = (auth, username) => new Promise((resolve, reject) => {
    fetch(`https://backend.joincuanz.com/users/username/check?username=${username}`, {
        method: "GET",
        headers: {
            Host: "backend.joincuanz.com",
            "X-Source": "ios",
            "X-Lang": "id",
            "X-App-Version": "1.32.0",
            "X-App-Debug": true,
            "X-App-Utc-Offset": 8,
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
        }
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(res => reject(res))
});

const saveUsername = (auth, username) => new Promise((resolve, reject) => {
    fetch(`https://backend.joincuanz.com/users/username`, {
        method: "PATCH",
        headers: {
            Host: "backend.joincuanz.com",
            "X-Source": "ios",
            "X-Lang": "id",
            "X-App-Version": "1.32.0",
            "X-App-Debug": true,
            "X-App-Utc-Offset": 8,
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({
            username
        })
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(res => reject(res))
});

const saveRefferal = (auth, referral_code) => new Promise((resolve, reject) => {
    fetch(`https://loyalty-svc.cuanz.com/api/loyalty/member/invite`, {
        method: "POST",
        headers: {
            Host: "loyalty-svc.cuanz.com",
            "X-Source": "ios",
            "X-Lang": "id",
            "X-App-Version": "1.32.0",
            "X-App-Debug": true,
            "X-App-Utc-Offset": 8,
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({
            referral_code
        })
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(res => reject(res))
});

const getDataFake = () => new Promise((resolve, reject) => {
    fetch(`https://randomuser.me/api/`, {
        method: "GET"
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(res => reject(res))
});



export {
    getOtp,
    getToken,
    saveRefferal,
    saveUsername,
    checkUsername,
    validateOtp,
    getDataFake
}