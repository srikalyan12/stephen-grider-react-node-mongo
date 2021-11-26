import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import emailValidation from '../../utils/emailValidation';
import { FIELDS } from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map((field) => {
      return (
        <Field
          key={field.name}
          label={field.label}
          type='text'
          name={field.name}
          component={SurveyField}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <button type='submit' className='teal btn-flat right white-text'>
            Next
            <i className='material-icons right'>done</i>
          </button>
          <Link to='/dashboard' className='red btn-flat white-text'>
            Cancel
            <i className='material-icons right'>cancel</i>
          </Link>
        </form>
      </div>
    );
  }
}
const validate = (values) => {
  let error = {};
  error.recipients = values.recipients && emailValidation(values.recipients);

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      error[name] = `Please enter the ${name}`;
    }
  });

  return error;
};

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
