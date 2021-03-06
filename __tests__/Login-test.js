import 'react-native';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import renderer from 'react-test-renderer';

it('renders the login screen', async () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the TextInput component', () => {
    const TextInput = require('TextInput');
    const tree = renderer
        .create(<TextInput />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('login & submit button rendered correctly', () => {
    const tree = renderer.create(
        <LoginScreen />
    ).toJSON();
    expect(tree.children[1].children[3].children[0].children[0].children).toContain("LOGIN");
    expect(tree.children[1].children[3].children[1].children[0].children).toContain("SIGNUP");    
});
