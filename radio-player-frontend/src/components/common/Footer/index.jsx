import React from "react";

const Footer = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>
              Tüm Hakları Saklıdır &copy; mRadio {new Date().getFullYear()}
            </span>
          </div>
        </div>
        <a className="scroll-to-top rounded" onClick={handleScroll}>
          <i className="fas fa-angle-up"></i>
        </a>
      </footer>
    </>
  );
};

export default Footer;
