import React from 'react';
import { connect } from 'react-redux';
import { FIELDS } from './formFields';
import { submitSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';

class SurveyReview extends React.Component {
  render() {
    return (
      <div>
        <h5>Please confirm your entries</h5>
        {FIELDS.map((field) => {
          return (
            <div key={field.name}>
              <div>
                <label>{field.label}</label>
                <div>{this.props.formValue[field.name]}</div>
              </div>
            </div>
          );
        })}
        <button
          className='yellow btn-flat darken-3'
          onClick={this.props.onCancel}
        >
          <i className='material-icons left'>arrow_back</i>
          Back
        </button>
        <button
          className='green btn-flat right'
          onClick={() =>
            this.props.submitSurvey(this.props.formValue, this.props.history)
          }
        >
          Send Survey
          <i className='material-icons right'>email</i>
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    formValue: state.form.surveyForm.values,
  };
};
export default connect(mapStateToProps, { submitSurvey })(
  withRouter(SurveyReview)
);
