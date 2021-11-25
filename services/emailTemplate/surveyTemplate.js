const { redirectDomain } = require('../../config/keys');
module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I do like your input</h3>
          <p>Please answer the following questions</p>
          <p>${survey.body}</p>
          <div>
            <a href="${redirectDomain}api/surveys">Yes</a>
          </div>
          <div>
            <a href="${redirectDomain}api/surveys">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};