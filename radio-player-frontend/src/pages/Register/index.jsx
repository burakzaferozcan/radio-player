import React from "react";
import { Link } from "react-router-dom";
import withRouter from "../../withRouter";
import { Formik } from "formik";
import * as Yup from "yup";
import RestClient from "../../RestAPI/RestClient";
import Notification from "../../RestAPI/Notification";
import AppUrl from "../../RestAPI/AppUrl";

function Register({ navigate }) {
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    RestClient.postRequest(AppUrl.register, values)
      .then((res) => {
        const status = res.status;
        const result = res.data;
        if (status === 201) {
          resetForm();
          setSubmitting(false);
          Notification.success(result);
          console.log(values);

          navigate("/login");
          console.log(values);
        } else {
          if (status === 422) {
            Notification.error(result);
            setSubmitting(false);
          } else {
            Notification.error(result);
            setSubmitting(false);
          }
        }
      })
      .catch((err) => {
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
                        <h1 className="h4 text-gray-900 mb-4">
                          Radio Hesap Oluştur
                        </h1>
                      </div>

                      <Formik
                        initialValues={{
                          name: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object().shape({
                          name: Yup.string().required(
                            "Adınız Soyadınız alanı boş bırakılamaz"
                          ),
                          email: Yup.string()
                            .email("Geçerli bir email adresi giriniz")
                            .required("Email alanı boş bırakılamaz"),
                          password: Yup.string()
                            .required("Şifre alanı boş bırakılamaz")
                            .min(8, "Şifreniz en az 8 karakter olmalıdır")
                            .max(16, "Şifreniz en fazla 16 karakter olmalıdır"),
                          password_confirmation: Yup.string()
                            .required("Şifre tekrar alanı boş bırakılamaz")
                            .oneOf(
                              [Yup.ref("password"), null],
                              "Şifreler eşleşmiyor"
                            ),
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
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange("name")}
                                value={values.name || ""}
                                type="text"
                                className="form-control form-control-user"
                                placeholder="Adınız Soyadınız"
                              />
                              {touched.name && errors.name && (
                                <small className="text-danger">
                                  {errors.name}
                                </small>
                              )}
                            </div>
                            <div className="form-group">
                              <input
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange("email")}
                                value={values.email || ""}
                                type="text"
                                className="form-control form-control-user"
                                placeholder="Email Adresiniz"
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
                            <div className="form-group">
                              <input
                                name="password_confirmation"
                                onBlur={handleBlur}
                                onChange={handleChange("password_confirmation")}
                                value={values.password_confirmation || ""}
                                type="password"
                                className="form-control form-control-user"
                                placeholder="Şifre Tekrar"
                              />
                              {touched.password_confirmation &&
                                errors.password_confirmation && (
                                  <small className="text-danger">
                                    {errors.password_confirmation}
                                  </small>
                                )}
                            </div>
                            <button
                              disabled={isSubmitting || !isValid}
                              onClick={handleSubmit}
                              type="submit"
                              className="btn btn-primary btn-user btn-block"
                            >
                              Hesap Oluştur
                            </button>
                            <hr />
                          </form>
                        )}
                      </Formik>

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

export default withRouter(Register);
