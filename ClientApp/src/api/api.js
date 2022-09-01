import { create } from "apisauce";
import settings from "../config/settings";

const api = create({ baseURL: settings.apiUrl });

api.addAsyncRequestTransform(async (request) => {
  const authToken = await localStorage["token"];

  if (!authToken) return;

  request.headers["Authorization"] = `bearer ${authToken}`;
});

export default api;
