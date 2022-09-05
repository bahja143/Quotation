import api from "./api";

const endPoint = "/quotations";

const getAll = () => api.get(endPoint);
const add = (branch) => api.post(endPoint, branch);
const approve = (id) => api.get(endPoint + "/" + id);
const getReport = () => api.get(endPoint + "/report");
const getDashboardData = () => api.get(endPoint + "/dashboard");
const update = (id, branch) => api.put(endPoint + "/" + id, branch);

export default { add, update, approve, getAll, getReport, getDashboardData };
