export const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

// Password must contain minimum 6 and contain at least one numeric digit, one uppercase and one lowercase letter!
export const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
