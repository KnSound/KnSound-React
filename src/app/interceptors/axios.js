import axios from "axios";
import { getUserDetails } from "../../features/user/userActions";
let store;

export const injectStore = _store => {
  store = _store
}
axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) {
    refresh = true;

    const response = await axios.post('auth/users/tokens', { withCredentials: true });

    if (response.status === 401) {
      debugger;
    }

    if (response.status === 200) {
      store.dispatch(getUserDetails());
      return axios(error.config);
    }
    // if (response.status === 200) {
    //   // localStorage.setItem('accessToken', response.headers['access-token']);
    //   // localStorage.setItem('refreshToken', response.headers['refresh-token']);
    //   // axios.defaults.headers.common['Authorization'] = `Bearer ${response.headers['access-token']}`;
    //   // axios.defaults.headers.common['Refresh-Token'] = response.headers['refresh-token'];
    //   console.log('token refreshed');
    //   store.dispatch(getUserDetails());
    //   // error.config.headers['Authorization'] = `Bearer ${response.headers['access-token']}`;
    //   return axios(error.config);
    // }
  }
  refresh = false;
  return error;
});
