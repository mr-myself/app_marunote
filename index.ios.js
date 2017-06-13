import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
import CookieManager from 'react-native-cookies';

const BASE_URL = 'https://marunote.mr-myself.xyz';

export default class MaruNote extends Component {
    constructor(props) {
        super(props)
        CookieManager.clearByName('_notebook_key', (err, res) => {
            console.log('cookie cleared!');
        });

        CookieManager.getAll((err, res) => {
            if (res._app_notebook_key) {
                this.setCookie('_notebook_key', res._app_notebook_key.value)
            }
        });
    }

    setCookie(name, cookie) {
        CookieManager.set({
            name: name,
            value: cookie,
            domain: 'marunote.mr-myself.xyz',
            origin: 'http://marunote.mr-myself.xyz',
            path: '/',
            version: '1.0',
            expiration: this.expirationDate()
        }, (err, res) => {
            console.log('sets cookie')
        });
    }

    setTargetUrl(url) {
        return ((url == BASE_URL + "/signin?method=post") || (url == BASE_URL + "/notebooks"))
    }

    expirationDate() {
        var date = new Date();
        var year = (date.getMonth() <= 11 ? date.getFullYear()+1 : date.getFullYear())
        var month = ((date.getMonth()+2) >= 13) ? '01' : ("0"+(date.getMonth()+2)).slice(-2)
        return (year + '-' + month + '-' + ("0" + date.getDate()).slice(-2) + 'T00:00:00.00-00:00')
    }

    _onNavigationStateChange(webViewState) {
        if (this.setTargetUrl(webViewState.url)) {
            CookieManager.get(BASE_URL, (err, cookie) => {
                if (cookie && cookie.hasOwnProperty('_notebook_key')) {
                    this.setCookie('_app_notebook_key', cookie._notebook_key)
                }
            });
        }
    }

    render() {
        return (
            <WebView
                source={{uri: 'https://marunote.mr-myself.xyz/notebooks'}}
                style={{marginTop: 20}}
                startInLoadingState={true}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            />
        );
    }
}

AppRegistry.registerComponent('MaruNote', () => MaruNote);
