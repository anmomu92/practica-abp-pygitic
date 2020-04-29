import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-mapviewer',
  templateUrl: './mapviewer.component.html',
  styleUrls: ['./mapviewer.component.css']
})
export class MapviewerComponent implements OnInit {

  map: any;
  L: any;
  accessAllowed = false;

  placesNodesGeoJSON = {};
  constructor( private comm: CommunicationService ) {
    this.placesNodesGeoJSON = {
      "type": "FeatureCollection",
      "name": "nodosPolitecnica",
      "features": [
        { "type": "Feature", "properties": { "ID": 78, "pathway": "entrada" }, "geometry": { "type": "Point", "coordinates": [ -1.85610419506303, 38.97882092278892 ] } },
        { "type": "Feature", "properties": { "ID": 179, "pathway": "pasillo" }, "geometry": { "type": "Point", "coordinates": [ -1.856814826914959, 38.978510466790816 ] } },
        { "type": "Feature", "properties": { "ID": 182, "pathway": "pasillo" }, "geometry": { "type": "Point", "coordinates": [ -1.856973322306332, 38.978922905261705 ] } }
      ]
    }

    this.comm.getAccessAllowed().subscribe((value) => {
      this.accessAllowed = value;
      this.reinitializeMap();
    });

  }

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    const L = window['L'];
    this.map = L.map('map').setView([38.9785, -1.8566], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 20,
      id: 'osmbase',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    const geojsonMarkerOptions = {
      radius: 8,
      fillColor: '#00f',
      color: '#00f',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };

    L.geoJSON(this.placesNodesGeoJSON, {
      style: (feature) => {
          switch (feature.properties.pathway) {
              case 'entrada': return {fillColor: this.accessAllowed ? '#00ff00' : '#ff0000'};
              case 'pasillo': return {fillColor: '#ffff00'};
          }
      },
      pointToLayer(feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    }).addTo(this.map);
  }

  reinitializeMap() {
    this.map.remove();
    this.initializeMap();
  }


}
