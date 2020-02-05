// Define projection that we will use (taken from https://epsg.io/3946, Proj4js section)
itowns.proj4.defs('EPSG:3946', '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

// Define initial camera position
var positionOnGlobe = { longitude: 4.818, latitude: 45.7354, altitude: 3000 };
var placement = {
    // Paris La Défense
    // coord: new itowns.Coordinates('EPSG:4326', 2.238196, 48.891546),
    // Nantes
    coord: new itowns.Coordinates('EPSG:4326', -1.553922, 47.218344),
    // Montgiscard
    // coord: new itowns.Coordinates('EPSG:4326', 1.573641, 43.457903),
    range: 3000,
    tilt: 45,
}
var meshes = [];
var linesBus = [];
var scaler;

// `viewerDiv` will contain iTowns' rendering area (`<canvas>`)
var viewerDiv = document.getElementById('viewerDiv');

// Instanciate iTowns GlobeView*
var view = new itowns.GlobeView(viewerDiv, placement);
setupLoadingScreen(viewerDiv, view);

// Add one imagery layer to the scene
// This layer is defined in a json file but it could be defined as a plain js
// object. See Layer* for more info.
// itowns.Fetcher.json('../layers/JSONLayers/Ortho.json')
itowns.Fetcher.json('./layers/JSONLayers/DARK.json').then(function _(config) {
    config.source = new itowns.WMTSSource(config.source);
    var layer = new itowns.ColorLayer('Ortho', config);
    view.addLayer(layer)
        // .then(menuGlobe.addLayerGUI.bind(menuGlobe));
});





// AFRAME.registerComponent('map', {
//     schema: {
//         color: {
//             default: '#000'
//         },
//     },

//     update: function () {
//         var material = new THREE.MeshBasicMaterial({
//             color: this.data.color,
//             wireframe: true
//         });

//         var geometry = new THREE.BoxGeometry(1, 1, 1);

//         this.el.setObject3D('mesh', new THREE.Mesh(geometry, material));
//     },

//     remove: function () {
//         this.el.removeObject3D('mesh');
//     }
// });

// console.log(itowns)