import React from "react";
import { Link } from "react-router-dom";
import withRouter from "../../withRouter";
import { Formik } from "formik";
import * as Yup from "yup";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Notification from "../../RestAPI/Notification";
import useAuthStore from "../../store/AuthStore";
function Login({ navigate }) {
  const AuthStore = useAuthStore();
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    RestClient.postRequest(AppUrl.login, values)
      .then((res) => {
        const status = res.status;
        const result = res.data;
        if (status === 200) {
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
          AuthStore.saveToken(appState);
          resetForm();
          setSubmitting(false);
          Notification.success(result);
          navigate("/");
        } else {
          if (status === 422) {
            Notification.error(result);
            setSubmitting(false);
          } else if (status === 401) {
            Notification.error(result);
            setSubmitting(false);
          } else {
            Notification.error(result);
            setSubmitting(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Notification.error({
          title: "Hata",
          message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.",
        });
        setSubmitting(false);
      });
  };
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
                      <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object().shape({
                          email: Yup.string()
                            .email("Geçerli bir email adresi giriniz")
                            .required("Email alanı boş bırakılamaz"),
                          password: Yup.string()
                            .required("Şifre alanı boş bırakılamaz")
                            .min(8, "Şifreniz en az 8 karakter olmalıdır")
                            .max(16, "Şifreniz en fazla 16 karakter olmalıdır"),
                        })}
                      >
                        {({
                          touched,
                          values,
                          errors,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                          isValid,
                          isSubmitting,
                        }) => (
                          <form className="user">
                            <div className="form-group">
                              <input
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange("email")}
                                value={values.email || ""}
                                type="text"
                                className="form-control form-control-user"
                                placeholder="Email Adresinizi Giriniz"
                              />
                              {touched.email && errors.email && (
                                <small className="text-danger">
                                  {errors.email}
                                </small>
                              )}
                            </div>
                            <div className="form-group">
                              <input
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange("password")}
                                value={values.password || ""}
                                type="password"
                                className="form-control form-control-user"
                                placeholder="Şifrenizi Giriniz"
                              />
                              {touched.password && errors.password && (
                                <small className="text-danger">
                                  {errors.password}
                                </small>
                              )}
                            </div>

                            <button
                              disabled={!isValid || isSubmitting}
                              type="submit"
                              onClick={handleSubmit}
                              className="btn btn-primary btn-user btn-block"
                            >
                              Giriş Yap
                            </button>
                            <hr />
                          </form>
                        )}
                      </Formik>

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

export default withRouter(Login);
