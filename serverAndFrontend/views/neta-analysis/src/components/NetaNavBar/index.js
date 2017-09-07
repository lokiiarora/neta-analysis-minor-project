import  {Menu} from 'semantic-ui-react';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';


export class NetaNavBar extends Component{
    state = {activeItem:"home"};

    _onClick = (e, {name}) => this.setState({activeItem:name})
    
    render(){
        let {activeItem} = this.state;
        return (
            <div>
                <Menu pointing secondary>
                <Link to="/"><Menu.Item name='home' active={activeItem === 'home'} onClick={this._onClick} /> </Link>
                <Link to="/state-based"><Menu.Item name='state-based' active={activeItem === 'state-based'} onClick={this._onClick} /></Link>
                <Link to="/constituency-based"><Menu.Item name='constituency-based' active={activeItem === 'constituency-based'} onClick={this._onClick} /></Link>
                <Menu.Menu position='right'>
                    <Link to="/about-us"><Menu.Item name='about-us' active={activeItem === 'about-us'} onClick={this._onClick} /></Link>
                </Menu.Menu>
                </Menu>
            </div>
        );
    }
}