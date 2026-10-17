import api from "../../../shared/services/api";

export async function fazerLogin(login, senha) {
    const resposta = await api.post("/login", { login, senha });
    
    return resposta.data;
}
