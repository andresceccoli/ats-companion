import { Api } from "./api";
import LocalApi from "./localApi";

export const getApi = (): Api => {
    return LocalApi;
};