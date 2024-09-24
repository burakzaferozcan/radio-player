import React, { useEffect } from "react";
import withRouter from "../../withRouter";
import useAuthStore from "../../store/AuthStore";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
function Logout({ navigate }) {
  const AuthStore = useAuthStore();
  useEffect(() => {
    doLogout();
  }, []);

  const doLogout = () => {
    AuthStore.getToken();
    const token =
      AuthStore.appState !== null ? AuthStore.appState.user.access_token : null;
    RestClient.getRequest(AppUrl.logout, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        AuthStore.removeToken();
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <></>;
}

export default withRouter(Logout);
