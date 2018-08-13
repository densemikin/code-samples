import { spawn, all, take, call, put } from 'redux-saga/effects';

import { COOKIE_TOKEN_KEY } from '../config';
import { ApiService, CookieService } from '../utils';
import { AUTH_TYPES } from '../types';
import { authActions, userActions } from '../actions';

function* login() {
  while (true) {
    try {
      const { payload, onSuccess } = yield take(AUTH_TYPES.LOGIN_REQUEST);

      const { caller } = ApiService.instance;

      yield put(authActions.loginSuccess());

      // const { data } = yield call(caller.post, 'api/omniauth_callbacks', { code: payload.code });

      // const { id_token } = payload.tokenObj;
      // const profile = payload.getBasicProfile();
      // const authResponse = payload.getAuthResponse();

      // const user = {
      //   email: profile.getEmail(),
      //   family_name: profile.getFamilyName(),
      //   given_name: profile.getGivenName(),
      //   google_id: profile.getId(),
      //   picture: profile.getImageUrl(),
      // };
      // yield put(authActions.loginSuccess());
      // yield put(userActions.updateUser(user));
      // yield call(CookieService.setCookie, COOKIE_TOKEN_KEY, authResponse.id_token);

      // if (onSuccess && onSuccess instanceof Function) onSuccess();
    } catch (e) {
      yield authActions.loginError(e);
    }
  }
}

function* signup() {
  while (true) {
    try {
      const { payload, onSuccess } = yield take(AUTH_TYPES.SIGNUP_REQUEST);

      const { caller } = ApiService.instance;

      yield put(authActions.signupSuccess());
    } catch (e) {
      yield authActions.signupError(e);
    }
  }
}

function* resetPassword() {
  while (true) {
    try {
      const { payload, onSuccess } = yield take(
        AUTH_TYPES.RESET_PASSWORD_REQUEST,
      );

      const { caller } = ApiService.instance;

      yield put(authActions.resetPasswordSuccess());
    } catch (e) {
      yield authActions.resetPasswordError(e);
    }
  }
}

function* changePassword() {
  while (true) {
    try {
      const { payload, onSuccess } = yield take(
        AUTH_TYPES.CHANGE_PASSWORD_REQUEST,
      );

      const { caller } = ApiService.instance;

      yield put(authActions.changePasswordSuccess());
    } catch (e) {
      yield authActions.changePasswordError(e);
    }
  }
}

function* logout() {
  while (true) {
    try {
      const { onSuccess } = yield take(AUTH_TYPES.LOGOUT_REQUEST);
      const token = yield call(
        CookieService.getFromLocalCookie,
        COOKIE_TOKEN_KEY,
      );
      yield call(CookieService.clear, COOKIE_TOKEN_KEY);
      yield put(userActions.clearUser());
      if (onSuccess && onSuccess instanceof Function) onSuccess();
    } catch (error) {
      console.error('Logout error ->> ', error);
    }
  }
}

export const AuthSaga = function* () {
  yield all([
    spawn(login),
    spawn(signup),
    spawn(resetPassword),
    spawn(changePassword),
    spawn(logout),
  ]);
};
