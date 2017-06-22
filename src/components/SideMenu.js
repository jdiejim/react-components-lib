import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { darken, lighten } from 'polished';

const Aside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 256px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
  transform: translate(${props => props.isHidden ? '-100%, 0' : '0, 0'});
  transition: all 400ms;
`;

const ripple = keyframes`
  to {
    transform: scale(150);
    opacity: 0;
  }
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.bgColor || '#FFF'};
  a {
    position: relative;
    padding: 20px;
    color: ${props => props.color || '#000'};
    cursor: pointer;
    overflow: hidden;
    text-decoration: none;
    &:hover {
      background-color: ${props => props.bgColor ? lighten(0.2, props.bgColor) : lighten(0.2, '#FFF')};
    }
    span {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      transform: scale(0);
    }
    .animate {
      background-color: ${props => props.bgColor ? darken(0.2, props.bgColor) : darken(0.2, '#FFF')};
      animation: ${ripple} 0.65s linear;
    }
  }
`

class SideMenu extends Component {
  componentDidMount() {
    const tabs = document.querySelectorAll('.side-menu-nav a');
    tabs.forEach(t => {
      t.addEventListener('click',this.addRippleAnimation);
      t.addEventListener('animationend',this.removeRippleAnimation);
    });
  }

  addRippleAnimation(e) {
    if (!this.children.length) {
      this.appendChild(document.createElement('span'));
    }

    const size = 5;
    const { top } = this.getBoundingClientRect();
    const circle = this.children[0];

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - size/2}px`;
    circle.style.top = `${e.clientY - size/2 - top}px`;
    circle.classList.add('animate');
  }

  removeRippleAnimation(e) {
    e.target.classList.remove('animate');
  }

  render() {
    return (
      <Aside {...this.props}>
        <Nav className='side-menu-nav' {...this.props}>
          {this.props.children}
        </Nav>
      </Aside>
    )
  }
}

export default SideMenu;
