import React from 'react';
import { Lifecycle, RouteContext } from 'react-router';

const ThemeManager = require('material-ui/lib/styles/theme-manager');
const DarkRawTheme = require('material-ui/lib/styles/raw-themes/dark-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
import Typography from 'material-ui/lib/styles/typography';
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Menu from 'material-ui/lib/menus/menu';
import LeftNav from 'material-ui/lib/left-nav';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Snackbar from 'material-ui/lib/snackbar';

import RouteHandler from 'react-router';
import ajax from '../../util/ajax';
import ConfirmDialog from './ConfirmDialog.jsx';

import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

var SelectableList = SelectableContainerEnhance(List);

const ClientAppPage = React.createClass({
    mixins: [RouteContext],

    currentUserUrl: "app/currentUser",

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState() {
        return {
            muiTheme: ThemeManager.getMuiTheme(DarkRawTheme),
            currentUser: {
                username: _('User not authorized')
            },
            leftNavOpen: false,
            snackbarOpen: false,
            snackbarMessage: "",
            autoHideDuration: 4000,
            snackbarStyle: ""
        };
    },

    componentWillMount: function () {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {});

        this.setState({muiTheme: newMuiTheme});
    },

    showMessage: function (message) {
        this.setState({
            snackbarOpen: true,
            snackbarHideDuration: 4000,
            snackbarStyle: "",
            snackbarMessage: message
        });
    },

    showError: function (message) {
        this.setState({
            snackbarOpen: true,
            snackbarHideDuration: 6000,
            snackbarStyle: "snackbar-error",
            snackbarMessage: message
        });
    },

    confirm: function (text, onConfirmed) {
        this.setState({
            confirmationText: text,
            confirmed: ()=> {
                this.setState({confirmDialogOpen: false});
                onConfirmed.apply()
            },
            confirmDialogOpen: true
        });
    },

    getChildContext () {
        return {
            muiTheme: this.state.muiTheme
        };
    },

    _getUserName: function () {
        return this.state && this.state.currentUser ? this.state.currentUser.username : "";
    },

    contextTypes: {
        muiTheme: React.PropTypes.object
    },

    _handleClickMenuIcon(e) {
        e.preventDefault();
        // Show/Hide the LeftMenu
        this.setState({leftNavOpen: !this.state.leftNavOpen});
    },

    // Get the selected item in LeftMenu
    _getSelectedIndex(menuItems) {
        let currentItem;

        for (let i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            if (currentItem.route && this.props.history.isActive(currentItem.route)) return i;
        }
    },

    _getCurrentRoute() {
        var i = this._getSelectedIndex(this.props.menuItems);

        return i >= 0 ? this.props.menuItems[i].route : undefined;
    },

    _onLeftNavChange(e, route) {
        if ("/logout" == route) {
            this._logout();
            return;
        }
        this.setState({
            leftNavOpen: false
        });
        this.props.history.pushState(null, route);
    },

    _onHeaderClick() {
        this.props.history.pushState(null, '/app/main');
        this.setState({leftNavOpen: false});
    },

    _setUserData (userData){
        if (userData.hasRole == undefined) {
            userData.hasRole = function (roleName) {
                for (var auth in this.authorities) {
                    if (userData.authorities[auth].authority == roleName)
                        return true;
                }

                return false;
            };
        }

        this.setState({currentUser: userData});
    },

    componentDidMount() {
        var self = this;
        ajax.exec({
            method: "GET",
            url: this.currentUserUrl,
            data: {}
        }).done(this._setUserData
        ).fail(function () {
            self._setUserData({username: _('menu.error.user-not-authorized')});
        });
    },

    _logout() {
        var prefix = (basePath ? basePath : '');
        var exitPath = prefix + '/logout';
        ajax.exec({
            method: "POST",
            url: exitPath,
            data: {}
        }).done(function () {
            document.location = prefix + "/login"
        }).fail(function () {
        });
    },

    render() {
        var menuItems = [];

        for (var i = 0; i < this.props.menuItems.length; i++) {
            var menuItem;
            var rightIcon = undefined;
            if (this.props.menuItems[i].iconRightClassName) {
                rightIcon = (<b className={this.props.menuItems[i].iconRightClassName}> </b>);
            }

            if (this.props.menuItems[i].userName) {
                menuItems.push(<Divider />);
                menuItem = (<ListItem key={i} index={i} rightIcon={rightIcon} disabled={true}
                                      primaryText={(this.state.currentUser ? this.state.currentUser.username : '')}/>);
                menuItems.push(menuItem);
                menuItems.push(<Divider />);
            } else {
                menuItem = (<ListItem key={i} index={i} rightIcon={rightIcon}
                                      primaryText={this.props.menuItems[i].text} value={this.props.menuItems[i].route}/>);
                menuItems.push(menuItem);
            }
        }

        var rightNavPanelTitle = (<span
            style={{
                fontSize: 24,
                fontWeight: Typography.fontWeightNormal,
                color: this.state.muiTheme.appBar.textColor,
                lineHeight: this.state.muiTheme.appBar.height + 'px'
            }}>{_('main.app-bar.right.title')}</span>);

        return (
            <div id="page_container">
                <LeftNav
                    ref="leftNav"
                    docked={false}
                    onRequestChange={open => this.setState({leftNavOpen: open})}
                    open={this.state.leftNavOpen}>
                    <SelectableList
                        valueLink={{
                            value: this._getCurrentRoute(),
                            requestChange: this._onLeftNavChange
                          }}>
                        {menuItems}
                    </SelectableList>
                </LeftNav>
                <header>
                    <AppBar onLeftIconButtonTouchTap={this._handleClickMenuIcon}
                            isInitiallyOpen={true} iconElementRight={rightNavPanelTitle}
                            title={_('main.app-bar.title')}
                    >

                    </AppBar>
                </header>

                <section className="content">
                    {React.cloneElement(this.props.children, {
                        showError: this.showError,
                        showMessage: this.showMessage,
                        confirm: this.confirm
                    })}
                </section>

                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={this.state.snackbarHideDuration}
                    className='snackbar-error'
                    onRequestClose={(reason) => this.setState({snackbarOpen: false})}
                />

                <ConfirmDialog
                    confirmation={this.state.confirmationText}
                    confirmed={this.state.confirmed}
                    show={this.state.confirmDialogOpen}
                    dismiss={()=>{this.setState({confirmDialogOpen:false});}}
                    open={false}
                />
            </div>

        );
    }

});

module.exports = ClientAppPage;