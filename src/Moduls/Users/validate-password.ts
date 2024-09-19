
export  interface IPasswordValidationResult {
    isValid: boolean;
    errorMessage: string;
}

export const validatePassword = (password: string): IPasswordValidationResult => {

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!isLongEnough) {
        return { isValid: false, errorMessage: "Пароль должен быть не менее 6 символов" };
    }
    if (!hasUpperCase) {
        return { isValid: false, errorMessage: "Пароль должен содержать хотя бы одну заглавную букву" };
    }
    if (!hasLowerCase) {
        return { isValid: false, errorMessage: "Пароль должен содержать хотя бы одну строчную букву" };
    }
    if (!hasNumber) {
        return { isValid: false, errorMessage: "Пароль должен содержать хотя бы одну цифру" };
    }
    if (!hasSpecialChar) {
        return { isValid: false, errorMessage: "Пароль должен содержать хотя бы один специальный символ" };
    }

    return { isValid: true, errorMessage: "" };
}