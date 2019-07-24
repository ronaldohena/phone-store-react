import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from 'react-router-dom';
import {ProductProvider} from '../src/components/Context';
//components
import App from './components/App';


const rootElement = document.getElementById("root");
ReactDOM.render(
  <ProductProvider>
    <Router>
      <App />
    </Router>
  </ProductProvider>,
rootElement);
