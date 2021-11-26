import { combineReducers } from 'redux';
import authReducers from './authReducer';
import fetchReducers from './surveysReducers';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducers,
  surveys: fetchReducers,
  form: reduxForm,
});
