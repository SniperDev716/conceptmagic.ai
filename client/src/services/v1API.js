import { getRequest, postRequest } from "./axiosClient";

export const getImageDescription = (data) => postRequest('v1/getImageDescription', data);
export const deleteFile = (data) => postRequest('v1/deleteFile', data);
export const getConceptById = (id, data) => getRequest(`v1/getConceptById/${id}`, data);
export const generateImage = (id, data) => postRequest(`v1/generateImage/${id}`, data);
export const getBlendingIdeas = (id, data) => postRequest(`v1/getBlendingIdeas/${id}`, data);
export const getProjects = (id, data) => getRequest(`v1/getProjects/${id || ""}`, data);
export const getImagesfromPin = (data) => postRequest(`v1/getImagesfromPin`, data);