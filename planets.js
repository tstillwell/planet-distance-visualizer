(function loadScene(){
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 100, 1e15 );
    let controls = new THREE.OrbitControls(camera);
    let renderConfig = {antialias: true, logarithmicDepthBuffer: true};
    let renderer = new THREE.WebGLRenderer(renderConfig);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    let sun = planetMesh({name: "sun", radius: 695700, texture: 0xFFFF00});
    let mercury = planetMesh({name: "mercury", radius: 2440, texture: 0x97979F});
    let venus = planetMesh({name: "venus", radius: 6050, texture: 0xE5E3DB});
    let earth = planetMesh({name: "earth", radius: 6371, texture: 0x00FF00});
    let mars = planetMesh({name: "mars", radius: 3390, texture: 0xFF0000});
    let jupiter = planetMesh({name: "jupiter", radius: 69911, texture: 0xE3DCCB});
    let saturn = planetMesh({name: "saturn", radius: 36184, texture: 0xE5E3DB});
    let uranus = planetMesh({name: "uranus", radius: 25362, texture: 0x8DA1AC});
    let neptune = planetMesh({name: "neptune", radius: 24622, texture: 0x44667F});
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
    positionAllInSpace(scene, distance_data);
    addOverlayListeners(scene);
    camera.position.z = 250000000;
    let animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    };
    animate();
})();


function planetMesh(preMeshData){ // Give mesh for each planet
    let radius = preMeshData.radius;
    let texture = preMeshData.texture;
    let name = preMeshData.name;
    let geometry = new THREE.SphereGeometry( radius * 2, 32, 32);
    let material = new THREE.MeshBasicMaterial( {color: texture} );
    let planet = new THREE.Mesh(geometry, material);
    planet.name = name;
    return planet;
}


function orbitRingFactory(distance){ // Make ring representing orbit
    let geometry = new THREE.RingGeometry( distance, distance + 1000000, 100 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00FFFF, side: THREE.DoubleSide } );
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

function addOverlayListeners(scene){
    let mercury = getBodyByName(scene, "mercury");
    let venus = getBodyByName(scene, "venus");
    document.querySelector("#mercury-select").addEventListener("click", selectPlanet(mercury));
    document.querySelector("#venus-select").addEventListener("click", selectPlanet(venus));
    document.querySelector("#earth-select").addEventListener("click", selectPlanet);
    document.querySelector("#mars-select").addEventListener("click", selectPlanet);
    document.querySelector("#jupiter-select").addEventListener("click", selectPlanet);
    document.querySelector("#saturn-select").addEventListener("click", selectPlanet);
    document.querySelector("#uranus-select").addEventListener("click", selectPlanet);
    document.querySelector("#neptune-select").addEventListener("click", selectPlanet);
}

function selectPlanet(planetName){  // fired on clicking planet in overlay
    
}

function getBodyByName(scene, name){
  let children = scene.children;
  for (let index = 0; index < children.length; index++){
      if (children[index].name === name){
          return children[index];
      }
  }
}
