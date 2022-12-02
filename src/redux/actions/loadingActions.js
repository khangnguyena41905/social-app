import { OFF_LOADING, ON_LOADING } from "../constants/loadingConstant";

export const on_loading = () => ({
  type: ON_LOADING,
});
export const off_loading = () => ({
  type: OFF_LOADING,
});
