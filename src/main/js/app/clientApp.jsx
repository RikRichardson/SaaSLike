import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Router, { Route, DefaultRoute, NotFoundRoute, Redirect, Link, IndexRoute } from 'react-router';
import MenuItem from 'material-ui/lib/menus/menu-item';

import { createHistory, useBasename } from 'history'
import ajax from './util/ajax.js';

const history = useBasename(createHistory)({
    basename: window['basePath']
})

//Helpers for debugging
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

/**
 * Render the main app component. You can read more about the react-router here:
 * https://github.com/rackt/react-router/blob/master/docs/guides/overview.md
 */

let ClientAppPage = require('./components/main/ClientAppPage.jsx');
let WelcomePage = require('./components/welcome/WelcomePage.jsx');
let SystemPage = require('./components/system/SystemPage.jsx');
let UsersPage = require('./components/users/UsersPage.jsx');
let UserSettingsPage = require('./components/userSettings/UserSettingsPage.jsx');

/*
 *
 * Пункты основного левого меню.
 * см. ниже ClientAppRoutes - пути в Route дожны быть согласованы с путями в меню
 *
 * */
var menuItems = [
    {route: '/app/main', text: 'Главная', iconRightClassName: 'icon_home'},
    {route: '/app/system', text: 'Система'},
    {type: 'SUBHEADER', text: (''), userName: true},
    {route: '/app/userSettings', text: 'Настройки'},
    {route: '/logout', text: _('menu.logout')}
];

var urls = '';

for (var i = 0; i < menuItems.length; i++) {
    if (menuItems[i].route)
        urls = urls + (i > 0 ? ',' : '') + menuItems[i].route;
}

ajax.exec({
    method: "GET",
    url: "app/allowedUrls",
    data: {urls}
}).done(function (allowedUrls) {
        var allowedItems = [];

        for (var i = 0; i < menuItems.length; i++) {
            if (allowedUrls.indexOf(menuItems[i].route) >= 0 || !menuItems[i].route)
                allowedItems[allowedItems.length] = menuItems[i];
        }

        // обертка над ClientAppPage
        // для того, чтобы передать доп.свойство
        // альтернативный вариант:
        /*
         * <Router createElement={createElement} ...
         *
         * function createElement(Component, props) {
         * props.menuItems={allowedItems};
         * return <Component {...props}/>
         * }
         * */
        let ClientAppPageWrapper = React.createClass({
            render: function () {
                return (
                    <ClientAppPage menuItems={allowedItems} {...this.props}/>
                );
            }
        });

        let NotFoundPage = React.createClass({
            _logout: function () {
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

            render: function () {
                this._logout();
                return <WelcomePage/>;
            }
        });

        let ClientAppRoutes = (
            <Route path='app' component={ClientAppPageWrapper}>
                <Route path="main" component={WelcomePage}/>
                <Route path='system' component={SystemPage}/>
                <Route path='userSettings' component={UserSettingsPage}/>
                <Route path='exit' component={WelcomePage}/>
                <Route path='*' component={NotFoundPage}/>
                <IndexRoute component={WelcomePage}/>
            </Route>
        );

        ReactDOM.render(<Router history={history}>{ClientAppRoutes}</Router>,
            document.getElementById('content'));
    }
).fail(function () {
    //TODO добавить какую-то обработку ошибки, если доступные URL-ы не отбираются сервлетом
})
