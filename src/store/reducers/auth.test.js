import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token upon logic', () => {
    expect(authReducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'someToken',
      userId: 'someId'
    })).toEqual({
      ...initialState,
      userId:  'someId',
      token: 'someToken',
    })
  });
});
