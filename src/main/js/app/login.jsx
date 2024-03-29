(function () {
  let React = require('react');
  let ReactDOM = require('react-dom');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let Login = require('./components/login/LoginPage.jsx'); // custom react component, wrapping login form
  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  // Render the main app react component into the document body.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  ReactDOM.render(<Login/>, document.getElementById('content'));

}) ();
