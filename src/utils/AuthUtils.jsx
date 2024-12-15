import { useSelector } from "react-redux";

export const useAuth = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.currentUser);

  return { isLoggedIn, user };
};
