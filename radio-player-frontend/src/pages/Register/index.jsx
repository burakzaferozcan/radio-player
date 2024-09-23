import React from "react";
import { Link } from "react-router-dom";

function Register() {
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
                        <h1 className="h4 text-gray-900 mb-4">
                          Radio Hesap Oluştur
                        </h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            placeholder="Adınız Soyadınız"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            placeholder="Email Adresiniz"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Şifrenizi Giriniz"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Şifre Tekrar"
                          />
                        </div>
                        <button className="btn btn-primary btn-user btn-block">
                          Hesap Oluştur
                        </button>
                        <hr />
                      </form>

                      <div className="text-center">
                        <Link className="small" to={"/login"}>
                          Zaten bir hesabın var mı?
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

export default Register;
