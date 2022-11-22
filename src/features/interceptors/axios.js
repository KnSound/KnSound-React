import axios from "axios";
import { getUserDetails } from "../../redux/user/userActions";
let store;

export const injectStore = _store => {
  store = _store
}

axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) {
    refresh = true;

    const response = await axios.post('auth/users/tokens', { withCredentials: true });

    if (response.status === 200) {
      store.dispatch(getUserDetails());
      return axios(error.config);
    }
  }
  refresh = false;
  return error;
});
