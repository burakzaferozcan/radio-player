const baseURL = "http://localhost:8000";
const apiURL = `${baseURL}/api`;

export const AppUrl = {
  register: `${apiURL}/client/register`,
  login: `${apiURL}/client/login`,
  logout: `${apiURL}/client/logout`,
  profile: `${apiURL}/client/profile`,
  update: `${apiURL}/client/update`,
  check: `${apiURL}/client/check`,
};

export default AppUrl;
