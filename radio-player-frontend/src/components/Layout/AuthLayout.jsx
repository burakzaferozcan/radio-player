import React, { Component } from "react";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { inject, observer } from "mobx-react";
import { withRouter } from "../../withRouter";

class AuthLayout extends Component {
  constructor(props) {
    super(props);
    this.isLoggedIn();
  }

  isLoggedIn = async () => {
    this.props.AuthStore.getToken();
    const token =
      this.props.AuthStore.appState !== null
        ? this.props.AuthStore.appState.user.access_token
        : null;

    const { navigate } = this.props;

    await RestClient.getRequest(AppUrl.check, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        const result = res.data;
        if (result.isLoggedIn !== true) {
          this.props.AuthStore.removeToken();
          navigate("/login");
        } else {
          let userData = {
            id: result.data.id,
            name: result.data.name,
            email: result.data.email,
            url: result.data.url,
            channel: result.data.channel,
            access_token: result.data.access_token,
          };

          let appState = {
            isLoggedIn: true,
            user: userData,
          };

          this.props.AuthStore.saveToken(appState);
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.AuthStore.removeToken();
        navigate("/login");
      });
  };

  render() {
    return <>{this.props.children}</>;
  }
}
export default withRouter(inject("authStore")(observer(AuthLayout)));
