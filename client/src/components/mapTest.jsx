

import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Google, Marker, InfoWindow, Geocoder, Circle} from 'react-gmaps';



var coords = {
  lat: 45.4073875,
  lng: -93.8904264
};

var GMap = React.createClass({
  getInitialState: function () {
    return {markers : []}
  },
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
    var self = this;
    var geocoder = new google.maps.Geocoder();
    var address = '16820 197th Ave NW,Big Lake, MN 55309, USA';
    geocoder.geocode({'address': address}, function(results, status) {
      console.log(status, results);
      var markers = self.state.markers;
      var newMrk = {};
      newMrk.lat = results[0].geometry.location.lat();
      newMrk.lng = results[0].geometry.location.lng();
      newMrk.name = 'Options Inc. facility';
      markers.push(newMrk);
      console.log(markers);
      self.setState({markers: markers});
    })
  },

  onDragEnd(e) {
    console.log('onDragEnd', e);
  },

  onCloseClick() {
    console.log('onCloseClick');
  },

  onClick(e) {
    console.log('onClick', e);
  },

  render() {

    return (
      <Gmaps
        width={'800px'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={12}
        loadingMessage={'Be happy'}
        params={{v: '3.exp'}}
        onMapCreated={this.onMapCreated}>
        {this.state.markers.map(function(m) {
          return (
            <Marker
              lat={m.lat}
              lng={m.lng}
              draggable={false}
              clickable={true}
              onClick={function(){console.log('marker click')}}
            />
          )
        })}

      </Gmaps>
    );
  }

});

module.exports = GMap;
