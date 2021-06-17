import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

// setup file
import { configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow, mount } from 'enzyme';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let wrapper: ShallowWrapper;
  
  beforeEach(() => {
    wrapper = shallow(<Login />);
     
  });
  
  test('it should have a title', () => {
    expect(wrapper.find("div#title").text()).toContain("Login Component");    
  });

  test('render user name field', () => {
    expect(wrapper.find("input#user-value").exists()).toBeTruthy();
  });

  test('render password field', () => {
    expect(wrapper.find("#password-value").exists()).toBeTruthy();
  });

  test('render Log In button', () => {
    expect(wrapper.find("button#login-btn").text()).toBe("Log in");
  });

});