import jwtDecode from "jwt-decode";

/* Detrmine token validity */
const tokenIsValid = (token) => {
    if (token) {
        try {
            let decoded = jwtDecode(token);
            let currentTime = Date.now() / 1000;
            return decoded.exp < currentTime ? false : true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

const validateField = (field) => {
    return field !== "" && field !== null && field !== undefined;
}

const validateEmail = (email) => {
    let emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    return emailCheck.test(email);
}

const isSuperuser = (token) => {
    let decoded =jwtDecode(token);
    return decoded.data.is_superuser; 
}

const getUserID = (token) => {
    let decoded =jwtDecode(token);
    return decoded.data.user_id ? decoded.data.user_id : null;
}

const getUserName = (token) => {
    let decoded =jwtDecode(token);
    return decoded.data.name ? decoded.data.name : null;
}

export default { tokenIsValid, validateField, validateEmail, isSuperuser, getUserID, getUserName }