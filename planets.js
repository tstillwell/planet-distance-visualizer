function loadScene(){
    const solarRadius = 695700;
    const mercuryRadius = 2440;
    const mercuryDistance = 57909050;
    const venusRadius = 6050;
    const venusDistance = 108200000;
    const earthRadius = 6371;
    const earthDistance = 149600000;
    const marsRadius = 3390;
    const marsDistance = 227900000;
    const jupiterRadius = 69911;
    const jupiterDistance = 483800000;
    const saturnRadius = 36184;
    const saturnDistance = 1434000000;
    const uranusRadius = 25362;
    const uranusDistance = 1784000000;
    const neptuneRadius = 24622;
    const neptuneDistance = 4495000000;
    let scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 100, 1e10 );
    controls = new THREE.OrbitControls(camera);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    let sunData = {radius: solarRadius, texture: 0xFFFF00};
    let sun = planetMeshFactory(sunData);
    let mercuryData = {radius: mercuryRadius, texture: 0x97979F};
    let mercury = planetMeshFactory(mercuryData);
    let venusData = {radius: venusRadius, texture: 0xE5E3DB};
    let venus = planetMeshFactory(venusData);
    let earthData = {radius: earthRadius, texture: 0x00FF00};
    let earth = planetMeshFactory(earthData);
    let marsData = {radius: marsRadius, texture: 0xFF0000};
    let mars = planetMeshFactory(marsData);
    let jupiterData = {radius: jupiterRadius, texture: 0xE3DCCB};
    let jupiter = planetMeshFactory(jupiterData);
    let saturnData = {radius: saturnRadius, texture: 0xE5E3DB};
    let saturn = planetMeshFactory(saturnData);
    let uranusData = {radius: uranusRadius, texture: 0x8DA1AC};
    let uranus = planetMeshFactory(uranusData);
    let neptuneData = {radius: neptuneRadius, texture: 0x44667F};
    let neptune = planetMeshFactory(neptuneData);
    scene.add(sun);
    scene.add(mercury);
    scene.add(venus);
    scene.add(earth);
    scene.add(mars);
    scene.add(jupiter);
    scene.add(saturn);
    scene.add(uranus);
    scene.add(neptune);
    mercury.position.set( mercuryDistance, 0, 0);
    venus.position.set(venusDistance, 0, 0 );
    earth.position.set(earthDistance, 0, 0);
    mars.position.set(marsDistance, 0, 0);
    jupiter.position.set(jupiterDistance, 0, 0);
    saturn.position.set(saturnDistance, 0, 0);
    uranus.position.set(uranusDistance, 0, 0);
    neptune.position.set(neptuneDistance, 0, 0);
    camera.position.z = 95000000;
    let animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    };
    animate();
}


function planetMeshFactory(preMeshData){ // Give mesh for each planet
    let radius = preMeshData.radius;
    let texture = preMeshData.texture;
    let geometry = new THREE.SphereGeometry( radius * 2, 32, 32);
    let material = new THREE.MeshBasicMaterial( {color: texture} );
    let planet = new THREE.Mesh(geometry, material);
    return planet;
}

function positionInSpace(planet, distance){ // add planet to model
    scene.add(planet);
    planet.position.set(distance, 0, 0);
}

loadScene();