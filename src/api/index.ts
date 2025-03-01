import { Api } from "./api";
// import LocalApi from "./localApi";
import RemoteApi from "./remoteApi";

export const getApi = (): Api => {
    // return LocalApi;
    return RemoteApi;
};