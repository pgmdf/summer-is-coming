import React, { Component } from 'react';
import './../App.css';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;


class Mapping extends React.Component {

    state = {
        loading: true
    }

    /* var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    
    var map = new mapboxgl.Map({
        container: 'YOUR_CONTAINER_ELEMENT_ID',
        style: 'mapbox://styles/mapbox/streets-v11'
    }); */


    componentDidMount() {

        const map = new mapboxgl.Map({
            container: this.mapWrapper,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [-73.985664, 40.748514],
            zoom: 12
        });
    }

    render() {
        return (
            <div />
        );
    }

}


export default Mapping;