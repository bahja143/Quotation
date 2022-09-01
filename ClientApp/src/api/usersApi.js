import api from "./api";

const endPoint = "/users";

const add = (user) => api.post(endPoint, user);
const update = (id, user) => api.put(endPoint + "/" + id, user);
const getAll = () => api.get(endPoint);

export default { add, update, getAll };
