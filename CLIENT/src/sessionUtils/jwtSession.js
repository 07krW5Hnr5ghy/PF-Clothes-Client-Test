// extraer token
export const getSession = async () =>
  await JSON.parse(sessionStorage.getItem("sessionData"));

export const setSession = (token) => 
  sessionStorage.setItem("sessionData", JSON.stringify(token));