function emailValidator(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // copied from chatgpt
    return emailRegex.test(email);
}

export { emailValidator }