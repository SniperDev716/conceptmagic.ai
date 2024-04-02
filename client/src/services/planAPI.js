import { getRequest, postRequest, putRequest } from "./axiosClient";

export const getUserSubscription = () => getRequest('plans/getUserSubscription');
export const cancelSubscription = (data) => putRequest('plans/cancelSubscription', data);
export const createSubscription = (data) => postRequest('plans/createSubscription', data);
export const increasePlanLimit = (data) => postRequest('plans/increasePlanLimit', data);