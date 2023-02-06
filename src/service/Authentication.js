import jsCookie from "js-cookie"

const LOGIN_URL = "https://apis.ccbp.in/login";

function userLogin(data){
    return fetch(LOGIN_URL, data);
}

function userLogout(data){
    jsCookie.remove("jwt_token");
    window.location = "/login";
}

export {userLogin, userLogout}