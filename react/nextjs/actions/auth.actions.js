import { AUTH_TYPES } from './../types';

export const login = (payload, onSuccess) => ({ type: AUTH_TYPES.LOGIN_REQUEST, payload, onSuccess });
export const loginError = payload => ({ type: AUTH_TYPES.LOGIN_ERROR, payload });
export const loginSuccess = payload => ({ type: AUTH_TYPES.LOGIN_SUCCESS, payload });

export const signup = (payload, onSuccess) => ({
  type: AUTH_TYPES.SIGNUP_REQUEST, payload, onSuccess,
});
export const signupError = payload => ({
  type: AUTH_TYPES.SIGNUP_ERROR, payload,
});
export const signupSuccess = payload => ({
  type: AUTH_TYPES.SIGNUP_SUCCESS, payload,
});

export const logout = onSuccess => ({ type: AUTH_TYPES.LOGOUT_REQUEST, onSuccess });
