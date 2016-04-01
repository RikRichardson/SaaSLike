const React = require('react');
const ReactDOM = require('react/lib/ReactDOM');
const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');
const ajax = require('../../util/ajax');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
import Colors from 'material-ui/lib/styles/colors';

const LoginForm = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    propTypes: {
        errorMessage: React.PropTypes.string
    },
    loginUrl: "do_login",
    setErrorMessage: function (errMessage) {
        this.setState({errorMessage: errMessage});
    },
    getDefaultProps: function () {
        return {}
    },
    componentWillMount: function () {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
        });

        this.setState({muiTheme: newMuiTheme});
    },
    getChildContext () {
        return {
            muiTheme: this.state.muiTheme
        };
    },
    getInitialState: function () {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
            submitResult: {errorObj: {}},
            visible: true,
            errorMessage: this.props.errorMessage,
            _csrf: $("meta[name='_csrf']").attr("content")
        };
    },
    render: function () {
        var errOutput = '';

        if (this.state.errorMessage) {
            errOutput = <div className="error_message">{this.state.errorMessage}</div>
        }

        var submitResult = '';

        if (this.state.submitResult.success == false) {
            submitResult = <div>
                Error : {this.state.submitResult.errorObj.message}
            </div>
        } else if (this.state.submitResult.success == true) {
            submitResult = <div>
                Hello, {this.state.submitResult.fullName}
            </div>
        }
        var self = this;

        return (
            <form className={this.props.formClassName}
                  style={this.state.visible ? {} : {display: 'none'}}
                  action={this.loginUrl}
                  method="post">
                {errOutput}
                <div>
                    <TextField
                        className="autofill-no-back"
                        floatingLabelText={_("login.login.label")}
                        floatingLabelStyle={{fontSize: "large"}}
                        value={this.state.submitResult.success ? "" : this.state.floatingPropValue}
                        onChange={this._handleFloatingInputChange}
                        ref="login"
                        name="username"
                        disabled={this.state.submitResult.success}
                    />
                </div>
                <div>
                    <TextField
                        type="password"
                        floatingLabelText={_("login.password.label")}
                        floatingLabelStyle={{fontSize: "large"}}
                        value={this.state.submitResult.success ? "" : this.state.floatingPropValue}
                        onChange={this._handleFloatingInputChange}
                        ref="pwd"
                        name="password"
                        disabled={this.state.submitResult.success}
                    />
                </div>

                <input type="hidden" name="_csrf" value={this.state._csrf}/>
                {submitResult}
                <div style={{marginTop: "20px"}}>
                    <RaisedButton
                        label={_('login.button.label')}
                        primary={true}
                        onClick={ function() {
                                var metaValue = $("meta[name='_csrf']").attr("content");
                                self.setState({
                                    _csrf: metaValue
                                });

                                if (self.state.submitResult.success) {
                                    window.location = basePath + "/app"
                                }

                                return true;
                            }
			            }
                        type="submit"
                    />
                    <RaisedButton
                        label={_('login.cancel.button.label')}
                        primary={false}
                        onClick={ function() {
                            self.setState({errorMessage: null});
                            self.props.closeDialog();
                            return true;
                            }
                        }
                        style={{marginLeft: '10px'}}
                    />
                </div>
            </form>
        );
    },
    _handleFloatingInputChange: function () {
    },
    componentDidMount: function () {
        ReactDOM.findDOMNode(this.refs.login).focus();
    }
});

module.exports = LoginForm;