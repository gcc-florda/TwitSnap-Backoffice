import { ADMIN_PATHS, TWITSNAPS_PATHS } from "@/services/paths";
import { API_TWITSNAP_BASE_URL, get, post } from "@/services/utils";

export const getTwitsnaps = (token: string) => {
  return get(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.twitsnaps}`, token);
}

export const getTwitsnap = (id: string, token: string) => {
  return get(`${API_TWITSNAP_BASE_URL}/${TWITSNAPS_PATHS.twitsnap}/${id}`, token);
}

export const blockTwitsnap = (id: string, token: string) => {
  return post(`${API_TWITSNAP_BASE_URL}/${TWITSNAPS_PATHS.twitsnap}/${TWITSNAPS_PATHS.blockTwitsnap}/${id}`, {}, token);
};

export const unblockUser = (id: string, token: string) => {
  return post(`${API_TWITSNAP_BASE_URL}/${TWITSNAPS_PATHS.twitsnap}/${TWITSNAPS_PATHS.unblockTwitsnap}/${id}`, {}, token);
};