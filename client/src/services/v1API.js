import { getRequest, postRequest } from "./axiosClient";

export const getImageDescription = (data) => postRequest('v1/getImageDescription', data);
export const deleteFile = (data) => postRequest('v1/deleteFile', data);
export const getConceptById = (id, data) => getRequest(`v1/getConceptById/${id}`, data);
export const generateImage = (id, data) => postRequest(`v1/generateImage/${id}`, data);