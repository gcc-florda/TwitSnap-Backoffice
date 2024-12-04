import { ADMIN_PATHS } from "@/services/paths";
import { API_TWITSNAP_BASE_URL, get, post } from "@/services/utils";

export const createService = (body: {name: string, description: string, selectedServices: string[]}, token: string) => {
  return post(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.services}`, body, token);
}

export const getServices = (token: string) => {
  return get(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.services}`, token);
}

export const getService = (id: string, token: string) => {
  return get(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.services}/${id}/${ADMIN_PATHS.serviceDetails}`, token);
}

export const activateService = (id: string, token: string) => {
  return post(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.services}/${id}/${ADMIN_PATHS.activateService}`, {}, token);
}

export const blockService = (id: string, token: string) => {
  return post(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.services}/${id}/${ADMIN_PATHS.blockService}`, {}, token);
}

export const unBlockService = (id: string, token: string) => {
  return post(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.services}/${id}/${ADMIN_PATHS.unblockService}`, {}, token);
}