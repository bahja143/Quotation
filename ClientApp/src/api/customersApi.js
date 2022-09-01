import api from "./api";

const endPoint = "/customers";

const add = (customer) => api.post(endPoint, customer);
const update = (id, customer) => api.put(endPoint + "/" + id, customer);
const getAll = () => api.get(endPoint);
const getById = (id) => api.get(endPoint + "/" + id);

export default { add, update, getAll, getById };
