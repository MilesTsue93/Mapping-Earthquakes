// Add a consolelog to check if our code is working
console.log("working");

// We create the street view that will be the default background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});



// create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets 
};

let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Create a style for the lines.
let myStyle = {
    color: "#1e90ff",
    weight: 2,
    fillColor: "#ffff00",
    opacity: 2.2,
    fillOpacity: 0.23
}

// Grabbing our GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2>Location: " + feature.properties.place + "</h2> <hr> <h3>Magnitude: " + feature.properties.mag + "<?h3>");
        }
    }).addTo(map); 
});