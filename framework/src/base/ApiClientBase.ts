import axios, { AxiosStatic } from "axios";
import "dotenv/config";
import AxiosLogger from "axios-logger"; // Ensure axios-logger is installed

export abstract class ApiClientBase {
  protected constructor() {
    axios.defaults.headers.common = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Request interceptor to log requests using axios-logger
    axios.interceptors.request.use(AxiosLogger.requestLogger);
    axios.defaults.validateStatus = () => true;
  }

  client: AxiosStatic = axios;
}
