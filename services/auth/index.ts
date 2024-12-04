import { API_TWITSNAP_BASE_URL, post } from "../utils";

const PATHS = {
  login: 'admin/login/',
  logout: 'admin/logout/',
  signup: 'admin/signup/',
};

export const signup = (body: { name: string; email: string; password: string }) => {
  return post(`${API_TWITSNAP_BASE_URL}/${PATHS.signup}`, body);
};

export const login = (body: { email: string; password: string }) => {
  return post(`${API_TWITSNAP_BASE_URL}/${PATHS.login}`, body);
};