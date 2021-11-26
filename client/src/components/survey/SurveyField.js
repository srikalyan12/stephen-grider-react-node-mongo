import React from 'react';

// props onChange is added by redux form
const SurveyField = ({ input, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};

export default SurveyField;
