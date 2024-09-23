import Swal from "sweetalert2";

export const success = (data) => {
  return Swal.fire({
    title: data.title,
    text: data.message,
    icon: "success",
    confirmButtonText: "OK",
  });
};

export const error = (data) => {
  return Swal.fire({
    title: data.title,
    text: data.message,
    icon: "error",
    confirmButtonText: "OK",
  });
};

export default { success, error };
