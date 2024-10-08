import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import withRouter from "../../../withRouter";
import RestClient from "../../../RestAPI/RestClient";
import AppUrl from "../../../RestAPI/AppUrl";

class Header extends Component {
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

    await RestClient.getRequest(AppUrl.check, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        const result = res.data;
        if (result.isLoggedIn !== true) {
          this.props.AuthStore.removeToken();
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
      });
  };

  render() {
    const { user } =
      this.props.AuthStore.appState !== null
        ? this.props.AuthStore.appState
        : {};

    return (
      <>
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow d-sm-none">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="searchDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-search fa-fw"></i>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {user.name}
                </span>
                <img
                  className="img-profile rounded-circle"
                  src="/front/img/undraw_profile.svg"
                />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <div className="dropdown-divider"></div>
                <Link to={"/logout"} className="dropdown-item">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Çıkış Yap
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default withRouter(inject("AuthStore")(observer(Header)));
