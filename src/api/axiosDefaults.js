import axios from "axios";

axios.defaults.baseURL = 'https://8000-martinab91-project5task-hc5012iima2.ws-eu63.gitpod.io/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;