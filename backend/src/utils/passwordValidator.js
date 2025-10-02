function passwordValidator(password){
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?])[\w!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    return reg.test(password)
}

export { passwordValidator }