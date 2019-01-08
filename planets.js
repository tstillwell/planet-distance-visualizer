(function loadScene() {
  'use strict';
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 100, 1e15);
  const controls = new THREE.OrbitControls(camera);
  const renderConfig = { antialias: true, logarithmicDepthBuffer: true };
  const renderer = new THREE.WebGLRenderer(renderConfig);
  const sun = planetMesh({ name: "sun", radius: 695700, texture: 0xFFFF00 });
  const mercury = planetMesh({ name: "mercury", radius: 2440, texture: 0x97979F });
  const venus = planetMesh({ name: "venus", radius: 6050, texture: 0xE5E3DB });
  const earth = planetMesh({ name: "earth", radius: 6371, texture: 0x00CFFF });
  const mars = planetMesh({ name: "mars", radius: 3390, texture: 0xB08960 });
  const jupiter = planetMesh({ name: "jupiter", radius: 69911, texture: 0xAD8D74 });
  const saturn = planetMesh({name: "saturn", radius: 36184, texture: 0xE5E3DB});
  const uranus = planetMesh({name: "uranus", radius: 25362, texture: 0x8DA1AC});
  const neptune = planetMesh({name: "neptune", radius: 24622, texture: 0x44667F});
  let distance_data = [ // avg distance from sun in km
    {id: sun, distance: 0},
    {id: mercury, distance: 57909050},
    {id: venus, distance: 108200000},
    {id: earth, distance: 149600000},
    {id: mars, distance: 227900000},
    {id: jupiter, distance: 483800000},
    {id: saturn, distance: 1434000000},
    {id: uranus, distance: 1784000000},
    {id: neptune, distance: 4495000000}
  ];
  window.camera = camera;
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  positionAllInSpace(scene, distance_data);
  addOverlayListeners(scene);
  camera.position.z = 250000000;
  let animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  };
  animate();
}());


function planetMesh({name, radius, texture}){ // Give mesh for each planet
  let geometry = new THREE.SphereGeometry( radius * 2, 32, 32);
  let material = new THREE.MeshBasicMaterial( {color: texture} );
  let planet = new THREE.Mesh(geometry, material);
  planet.name = name;
  return planet;
}


function orbitRingFactory(distance){ // Make ring representing orbit
  let geometry = new THREE.RingGeometry( distance, distance + 500000, 256 );
  let material = new THREE.MeshBasicMaterial({
    color: 0x00FFFF, side: THREE.DoubleSide
  });
  let ring = new THREE.Mesh( geometry, material );
  return ring;
}


function positionAllInSpace(scene, planets_data){ // add all planets to model
  planets_data.forEach(function(distance_data){
    let bodyname = distance_data.id;
    let distance = distance_data.distance;
    let ring = orbitRingFactory(distance);
    if (distance !== 0){ // dont add ring for sun
      scene.add(ring);
    }
    scene.add(bodyname);
    bodyname.position.set(distance, 0, 0);
  });
}


function addOverlayListeners(scene){ // add event listeners for overlay
  let mercury = getBodyByName(scene, "mercury");
  let venus = getBodyByName(scene, "venus");
  let earth = getBodyByName(scene, "earth");
  let mars = getBodyByName(scene, "mars");
  let jupiter = getBodyByName(scene, "jupiter");
  let saturn = getBodyByName(scene, "saturn");
  let uranus = getBodyByName(scene, "uranus");
  let neptune = getBodyByName(scene, "neptune");
  bindOverlayListener("#mercury-select", mercury);
  bindOverlayListener("#venus-select", venus);
  bindOverlayListener("#earth-select", earth);
  bindOverlayListener("#mars-select", mars);
  bindOverlayListener("#jupiter-select", jupiter);
  bindOverlayListener("#saturn-select", saturn);
  bindOverlayListener("#uranus-select", uranus);
  bindOverlayListener("#neptune-select", neptune);
}


function bindOverlayListener(selector, planet){
  let overlay_element = document.querySelector(selector);
  overlay_element.addEventListener("click", function(){
    selectPlanet(planet);
  });
}


function selectPlanet(planet){  // fired on clicking planet in overlay
  window.camera.position.set(planet.position.x, planet.position.y, 400000);
  window.camera.lookAt(planet.position);
}


function getBodyByName(scene, name){ // retrieve planet from scene by name
  let bodylist = scene.children;
  for (body in bodylist){
    if (bodylist[body].name === name){
        return bodylist[body];
    }
  }
}
