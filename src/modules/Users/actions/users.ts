import { ADMIN_PATHS, TWITSNAPS_PATHS, USERS_PATHS } from "@/services/paths";
import { API_TWITSNAP_BASE_URL, get, post } from "@/services/utils";

export const getUsers = (token: string) => {
  return get(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.users}`, token);
}

export const getUserById = (id: string, token: string) => {
  return get(`${API_TWITSNAP_BASE_URL}/${USERS_PATHS.user}/${id}/${USERS_PATHS.userDetails}`, token);
}

export const getTwitsnapsByUserId = (id: string, token: string) => {
  return get(`${API_TWITSNAP_BASE_URL}/${USERS_PATHS.user}/${id}/${TWITSNAPS_PATHS.twitsnaps}`, token);
}

export const registerUserAdmin = (id: string, token: string) => {
  return post(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.admin}/${ADMIN_PATHS.registerAdmin}/${id}`, {}, token);
};

export const blockUser = (id: string, token: string) => {
  return post(`${API_TWITSNAP_BASE_URL}/${USERS_PATHS.user}/${USERS_PATHS.blockUser}/${id}`, {}, token);
};

export const unblockUser = (id: string, token: string) => {
  return post(`${API_TWITSNAP_BASE_URL}/${USERS_PATHS.user}/${USERS_PATHS.unblockUser}/${id}`, {}, token);
};

export const verifyUser = (id: string, token: string) => {
  return post(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.admin}/${USERS_PATHS.user}/${id}/${USERS_PATHS.verify}`, {}, token);
};
