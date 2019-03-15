import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Listing from './Listing';
import Add from './Add';
import Edit from './Edit';

export default class Index extends Component {
    render() {
        return (
            <>
                <Route exact path="/dashboard/berita" component={Listing}/>
                <Route exact path="/dashboard/berita/add" component={Add}/>
                <Route exact path="/dashboard/berita/edit/:id" component={Edit}/>
            </>
        );
    }
}

