import { ADMIN_PATHS } from "@/services/paths";
import { API_TWITSNAP_BASE_URL, get } from "@/services/utils";

export const getMetrics = async (token: string) => {
  return get(`${API_TWITSNAP_BASE_URL}/${ADMIN_PATHS.metrics}`, token);
}