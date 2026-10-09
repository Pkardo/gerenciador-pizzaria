import api from "./axios";

export function login(login, senha) {
    return api.post("/login", {login, senha});
}