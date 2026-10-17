const CHAVE_DO_TOKEN = "token";

export function salvarToken(token) {
    localStorage.setItem(CHAVE_DO_TOKEN, token);
}

export function obterToken() {
    return localStorage.getItem(CHAVE_DO_TOKEN);
}