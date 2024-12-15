import axios from "axios";
import { signInSuccess } from "@/redux/user/userSlice";

export const loadUserFromLocalStorage = (dispatch) => {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("currentUser");

  if (token && user) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(signInSuccess(JSON.parse(user)));
  }
};
