/** In this file, we create a React component which incorporates components provided by material-ui */
const React = require('react');
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
const LoginForm = require('./LoginForm.js');

const Login = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState () {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
            open: false
        };
    },

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    },

    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
        });

        this.setState({muiTheme: newMuiTheme});
    },

    componentDidMount: function () {
        var errorMessage;

        if ($('#ss_last_message').length > 0) {
            errorMessage = $('#ss_last_message').val();

            this.setLoginError(errorMessage);
            this.handleOpen();
        }
    },

    render() {

        let containerStyle = {
            textAlign: 'center',
            paddingTop: '200px'
        };

        var standardActions = [];

        return (
            <div style={containerStyle}>
                <Dialog
                    actions={standardActions}
                    open={this.state.open}
                    modal={false}
                    contentClassName="login-dialog-content"
                >
                    <LoginForm closeDialog={this.handleClose}
                               formClassName="login-form"
                               errorMessage={this.state.loginErrorMessage}
                    />
                </Dialog>

                <h1>{_('login.main.header.label')}</h1>

                <RaisedButton label={_('login.main.open-dialog.label')} primary={true} onTouchTap={this.handleOpen}/>

            </div>
        );
    },

    handleOpen() {
        this.setState({
            open: true,
            modal: false
        });
    },

    handleClose() {
        this.setState({open: false});
    },

    setLoginError(errMessage) {
        this.setState({loginErrorMessage: errMessage});
    }
});

module.exports = Login;
