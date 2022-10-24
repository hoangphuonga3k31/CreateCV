// import axios from "axios"

// export async function CreateAccount(username, password) {
//     await axios.post(`https://cvnl.me/uuid/v1/user/create`,  { account: username, hash: password } )
//         .then(res => {
//             console.log("res: ", res)
//             console.log("res data: ", res.data)
//             return res.data
//         })
// }

export async function CreateAccount(username, password) {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({account: username, hash: password})
    };
    await fetch('https://cvnl.me/uuid/v1/user/create', options)
        .then((res) => res.json())
        .then(data => console.log(data));
}

export async function CheckLogin(username, password) {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({account: username, hash: password})
    };
    await fetch('https://cvnl.me/uuid/v1/user/hash', options)
        .then((res) => res.json())
        .then(data => {
            console.log("res data: ", data)
        }) 
}
