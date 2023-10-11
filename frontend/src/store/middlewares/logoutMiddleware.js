import { userLoggedOut } from "../reducers/authSlice";
let isDispatchingLogout = false;

const logoutMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (
    !isDispatchingLogout &&
    state.auth.expireTimeStamp &&
    Date.now() > state.auth.expireTimeStamp &&
    state.auth.isLoggedIn
  ) {
    isDispatchingLogout = true;
    store.dispatch(userLoggedOut());
    isDispatchingLogout = false;
  }

  return next(action);
};

export default logoutMiddleware;
