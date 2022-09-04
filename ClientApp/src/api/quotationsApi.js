import api from "./api";

const endPoint = "/quotations";

const add = (branch) => api.post(endPoint, branch);
const update = (id, branch) => api.put(endPoint + "/" + id, branch);
const getAll = () => api.get(endPoint);

export default { add, update, getAll };
