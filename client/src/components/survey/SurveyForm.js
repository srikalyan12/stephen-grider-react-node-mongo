import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'emails' },
];
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
        <form onSubmit={this.props.handleSubmit((value) => console.log(value))}>
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

export default reduxForm({
  form: 'surveyForm',
})(SurveyForm);
