import api from "./api";

const endPoint = "/token";

const login = (user) => api.post(endPoint, user);

export default { login };
