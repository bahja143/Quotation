import api from "./api";

const endPoint = "/companies";

const add = (company) => api.post(endPoint, company);
const update = (id, company) => api.put(endPoint + "/" + id, company);
const getAll = () => api.get(endPoint);
const getById = (id) => api.get(endPoint + "/" + id);

export default { add, update, getAll, getById };
