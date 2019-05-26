import Axios from "axios";
import Validator from "./validationUtils";
// import * as Toast from "./toaster";
import * as Config from "../config"

Axios.interceptors.request.use(
    config => {
        /* Don't send a token to the login route - we expect to get the token from it */
        if (config.url !== Config.BASE_URL + "/auth/login") {
            let token = localStorage.getItem('loginToken');
            /* Validate and attach a token */
            if (Validator.tokenIsValid(token)) {
                config.headers.authorization = `Bearer ${token}`;
            } else {
                localStorage.removeItem('loginToken');
                // Toast.make("error", "Session expired", "Your session has expired.");
            }
        }
        return config;
    },
    error => {
        return  Promise.reject(error);
    }
);

export default Axios;