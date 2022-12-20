import axios from "axios";
import axiosInstance from "../axiosInstance";
import { getUserDetails } from "../../redux/user/userActions";
let store;

export const injectStore = _store => {
  store = _store
}

axiosInstance.defaults.withCredentials = true;

let refresh = false;

axiosInstance.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) {
    refresh = true;

    const response = await axiosInstance.post('auth/users/tokens', { withCredentials: true });

    if (response.status === 200) {
      store.dispatch(getUserDetails());
      return axiosInstance(error.config);
    }
  }
  refresh = false;
  return error;
});
