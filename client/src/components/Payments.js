import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';

class Payments extends React.Component {
  onToken = (token) => {
    this.props.handleToken(token);
  };

  render() {
    return (
      <StripeCheckout
        amount={500}
        token={this.onToken}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        currency={'INR'}
        name='Emaily'
        description='RS.5 for 5 email credits'
        image='https://stripe.com/img/documentation/checkout/marketplace.png'
      >
        <button className='btn'>Add credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, { handleToken })(Payments);
