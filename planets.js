(function loadScene(){
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 100, 1e15 );
    window.camera = camera;
    let controls = new THREE.OrbitControls(camera);
    window.controls = controls;
    let renderConfig = {antialias: true, logarithmicDepthBuffer: true};
    let renderer = new THREE.WebGLRenderer(renderConfig);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    let sun = planetMesh({name: "sun", radius: 695700, texture: 0xFFFF00});
    let mercury = planetMesh({name: "mercury", radius: 2440, texture: 0x97979F});
    let venus = planetMesh({name: "venus", radius: 6050, texture: 0xE5E3DB});
    let earth = planetMesh({name: "earth", radius: 6371, texture: 0x00CFFF});
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

function addOverlayListeners(scene){ // bind overlay buttons to planets in scene
    let mercury = getBodyByName(scene, "mercury");
    let venus = getBodyByName(scene, "venus");
    let earth = getBodyByName(scene, "earth");
    let mars = getBodyByName(scene, "mars");
    let jupiter = getBodyByName(scene, "jupiter");
    let saturn = getBodyByName(scene, "saturn");
    let uranus = getBodyByName(scene, "uranus");
    let neptune = getBodyByName(scene, "neptune");
    document.querySelector("#mercury-select").addEventListener("click", function(){selectPlanet(mercury)});
    document.querySelector("#venus-select").addEventListener("click", function(){selectPlanet(venus)});
    document.querySelector("#earth-select").addEventListener("click", function(){selectPlanet(earth)});
    document.querySelector("#mars-select").addEventListener("click", function(){selectPlanet(mars)});
    document.querySelector("#jupiter-select").addEventListener("click", function(){selectPlanet(jupiter)});
    document.querySelector("#saturn-select").addEventListener("click", function(){selectPlanet(saturn)});
    document.querySelector("#uranus-select").addEventListener("click", function(){selectPlanet(uranus)});
    document.querySelector("#neptune-select").addEventListener("click", function(){selectPlanet(neptune)});
}

function selectPlanet(planet){  // fired on clicking planet in overlay
    window.camera.position.set(planet.position.x, planet.position.y, 400000);
}

function getBodyByName(scene, name){ // retrieve planet from scene by name
  let children = scene.children;
  for (let index = 0; index < children.length; index++){
      if (children[index].name === name){
          return children[index];
      }
  }
}
