import 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import renderer from 'react-test-renderer';

it('renders the home screen', async () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('titlebar rendered correctly', () => {
    const tree = renderer.create(
        <HomeScreen />
    ).toJSON();
    expect(tree.children[0].children[0].children[0]).toContain("My Todos");
});

it('Logout button is rendered', () => {
    const tree = renderer.create(
        <HomeScreen />
    ).toJSON();
    expect(tree.children[0].children[1].children[0]).toContain("Logout");
});