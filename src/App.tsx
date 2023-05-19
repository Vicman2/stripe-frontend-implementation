import React from 'react';
import logo from './logo.svg';
import 'react-stripe-js/dist/style.css';
import './App.css';
import { PaymentModel } from './payment.page';

function App() {
  return (
    <div className="App">
      <PaymentModel />
    </div>
  );
}

export default App;
