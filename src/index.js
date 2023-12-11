// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import store from "./redux/store";
// import { Provider } from "react-redux";

// import { createRoot } from 'react-dom/client';
// import { Auth0Provider } from '@auth0/auth0-react';


// const root = createRoot(document.getElementById('app'));

// ReactDOM.render(
//   <Auth0Provider
//   domain="yyPKEQt27oqZ4hjwo4swABRk3haMhgFz"
//   clientId="0693E-PwHHLO5h1H0_hVxhkdYdbijOTHz98m_QhoP2GWgK0neHZOMJyqAgq5LXix"
//   authorizationParams={{
//     redirect_uri: window.location.origin,
//   }}
// >
  
//     <Provider store={store}>
//       <App />
//     </Provider>
//     </Auth0Provider>,
//   document.getElementById("root")
// ); 




import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);