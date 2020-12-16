import jwtDecode from "jwt-decode"

export const getAccessToken = () => {
    return localStorage.getItem("accessToken")
}

export const setAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token)
}