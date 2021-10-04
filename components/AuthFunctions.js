import firebase from './FirebaseInstance'


export async function emailSignUp(inputEmail, inputPassword) {
    try {
        let signUpResponse = await firebase.auth().createUserWithEmailAndPassword(inputEmail, inputPassword)
        //console.log(signUpResponse)
        return {"success": true, "info": signUpResponse}
    } catch(err) {
        //{\"code\":\"auth/invalid-email\",\"message\":\"The email address is badly formatted.\"}
        //{\"code\":\"auth/weak-password\",\"message\":\"Password should be at least 6 characters\"}
        let errorMsg = "Error"
        if(JSON.stringify(err) == "{\"code\":\"auth/invalid-email\",\"message\":\"The email address is badly formatted.\"}") {
            errorMsg = "Invalid Email"
        }
        if(JSON.stringify(err) == "{\"code\":\"auth/weak-password\",\"message\":\"Password should be at least 6 characters\"}") {
            errorMsg = "Password should be at least 6 characters"
        }
        return {"success": false, "errorMessage": errorMsg}
    }
}

export async function emailLogin(inputEmail, inputPassword) {
    try {
        let signInResponse = await firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword)
        return {"success": true, "info": signInResponse}
    } catch(err) {
        return {"success": false, "errorMessage": err}
    }
}