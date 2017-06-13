import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

export default class MaruNote extends Component {
    render() {
        return (
              <WebView
                  source={{uri: 'https://marunote.mr-myself.xyz'}}
                  style={{marginTop: 20}}
              />
        );
    }
}

AppRegistry.registerComponent('MaruNote', () => MaruNote);
