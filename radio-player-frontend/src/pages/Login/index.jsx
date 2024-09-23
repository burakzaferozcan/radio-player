import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Radio Giriş</h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            placeholder="Email Adresinizi Giriniz"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Şifrenizi Giriniz"
                          />
                        </div>

                        <button className="btn btn-primary btn-user btn-block">
                          Giriş Yap
                        </button>
                        <hr />
                      </form>

                      <div className="text-center">
                        <Link className="small" to={"/register"}>
                          Hesap Oluştur
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
