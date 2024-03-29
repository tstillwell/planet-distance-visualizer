(function loadScene() {
  'use strict';
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 100, 1e15);
  const controls = new THREE.OrbitControls(camera);
  const renderConfig = { antialias: true, logarithmicDepthBuffer: true };
  const renderer = new THREE.WebGLRenderer(renderConfig);
  const sun = PlanetMesh({ name: 'sun', radius: 695700, texture: 0xFFFF00 });
  const mercury = PlanetMesh({ name: 'mercury', radius: 2440, texture: 0x97979F });
  const venus = PlanetMesh({ name: 'venus', radius: 6050, texture: 0xE5E3DB });
  const earth = PlanetMesh({ name: 'earth', radius: 6371, texture: 0x00CFFF });
  const mars = PlanetMesh({ name: 'mars', radius: 3390, texture: 0xB08960 });
  const jupiter = PlanetMesh({ name: 'jupiter', radius: 69911, texture: 0xAD8D74 });
  const saturn = PlanetMesh({ name: 'saturn', radius: 36184, texture: 0xE5E3DB });
  const uranus = PlanetMesh({ name: 'uranus', radius: 25362, texture: 0x8DA1AC });
  const neptune = PlanetMesh({ name: 'neptune', radius: 24622, texture: 0x44667F });
  const distanceData = [ // avg distance from sun in km
    { id: sun, distance: 0 },
    { id: mercury, distance: 57909050 },
    { id: venus, distance: 108200000 },
    { id: earth, distance: 149600000 },
    { id: mars, distance: 227900000 },
    { id: jupiter, distance: 483800000 },
    { id: saturn, distance: 1434000000 },
    { id: uranus, distance: 1784000000 },
    { id: neptune, distance: 4495000000 },
  ];
  window.camera = camera;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  positionAllInSpace(scene, distanceData);
  addOverlayListeners(scene);
  camera.position.z = 250000000;
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}());


function PlanetMesh({ name, radius, texture }) {
  // Generates 3D Mesh for each planet
  const geometry = new THREE.SphereGeometry(radius * 2, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: texture });
  const planet = new THREE.Mesh(geometry, material);
  planet.name = name;
  return planet;
}


function OrbitRing(distance) {
  // Make ring representing orbit
  const geometry = new THREE.RingGeometry(distance, distance + 500000, 256);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00FFFF, side: THREE.DoubleSide
  });
  const ring = new THREE.Mesh(geometry, material);
  return ring;
}


function positionAllInSpace(scene, planetsData) {
  // add all planets to model
  planetsData.forEach(function (distanceData) {
    const bodyname = distanceData.id;
    const distance = distanceData.distance;
    const ring = OrbitRing(distance);
    if (distance !== 0) { // dont add ring for sun
      scene.add(ring);
    }
    scene.add(bodyname);
    bodyname.position.set(distance, 0, 0);
  });
}


function addOverlayListeners(scene) {
  // add event listeners for overlay
  bindOverlayListener('#mercury-select', getBodyByName(scene, 'mercury'));
  bindOverlayListener('#venus-select', getBodyByName(scene, 'venus'));
  bindOverlayListener('#earth-select', getBodyByName(scene, 'earth'));
  bindOverlayListener('#mars-select', getBodyByName(scene, 'mars'));
  bindOverlayListener('#jupiter-select', getBodyByName(scene, 'jupiter'));
  bindOverlayListener('#saturn-select', getBodyByName(scene, 'saturn'));
  bindOverlayListener('#uranus-select', getBodyByName(scene, 'uranus'));
  bindOverlayListener('#neptune-select', getBodyByName(scene, 'neptune'));
}


function bindOverlayListener(selector, planet) {
  // add event listeners to overlay items to select clicked planet
  const overlayElement = document.querySelector(selector);
  overlayElement.addEventListener('click', function() {
    selectPlanet(planet);
  });
}


function selectPlanet(planet) {
  // fired on clicking planet in overlay
  window.camera.position.set(planet.position.x, planet.position.y, 400000);
  window.camera.lookAt(planet.position);
}


function getBodyByName(scene, name) {
  // retrieve planet from scene by name
  const bodylist = scene.children;
  for (let i = 0; i < bodylist.length; i += 1) {
    if (bodylist[i].name === name) {
      return bodylist[i];
    }
  }
}
