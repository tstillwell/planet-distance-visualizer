function loadScene(){
    const NEAR = 100;
    const FAR = 1e10;
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
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, NEAR, FAR );
    controls = new THREE.OrbitControls(camera);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    let sunData = {radius: solarRadius, texture: 0xFFFF00};
    let sun = planetMeshFactory(sunData);
    let mercuryGeometry = new THREE.SphereGeometry( mercuryRadius * 2, 32, 32);
    let mercuryMaterial = new THREE.MeshBasicMaterial( {color: 0x97979F} );
    let mercury = new THREE.Mesh (mercuryGeometry, mercuryMaterial);
    let venusGeometry = new THREE.SphereGeometry( venusRadius * 2, 32, 32);
    let venusMaterial = new THREE.MeshBasicMaterial( {color: 0xE5E3DB} );
    let venus = new THREE.Mesh (venusGeometry, venusMaterial);
    let earthGeometry = new THREE.SphereGeometry( earthRadius * 2, 32, 32 );
    let earthMaterial = new THREE.MeshBasicMaterial( {color: 0x00FF00} );
    let earth = new THREE.Mesh (earthGeometry, earthMaterial);
    let marsGeometry = new THREE.SphereGeometry( marsRadius * 2, 32, 32);
    let marsMaterial = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
    let mars = new THREE.Mesh (marsGeometry, marsMaterial);
    let jupiterGeometry = new THREE.SphereGeometry( jupiterRadius * 2, 32, 32);
    let jupiterMaterial = new THREE.MeshBasicMaterial( {color: 0xE3DCCB} );
    let jupiter = new THREE.Mesh (jupiterGeometry, jupiterMaterial);
    let saturnGeometry = new THREE.SphereGeometry( saturnRadius * 2, 32, 32);
    let saturnMaterial = new THREE.MeshBasicMaterial( {color: 0xE5E3DB} );
    let saturn = new THREE.Mesh (saturnGeometry, saturnMaterial);
    let uranusGeometry = new THREE.SphereGeometry( uranusRadius * 2, 32, 32);
    let uranusMaterial = new THREE.MeshBasicMaterial( {color: 0x8DA1AC} );
    let uranus = new THREE.Mesh (uranusGeometry, uranusMaterial);
    let neptuneGeometry = new THREE.SphereGeometry( neptuneRadius * 2, 32, 32);
    let neptuneMaterial = new THREE.MeshBasicMaterial( {color: 0x44667F} );
    let neptune = new THREE.Mesh (neptuneGeometry, neptuneMaterial);
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
    let planetMesh = preMeshData;
    let radius = planetMesh.radius;
    let texture = preMeshData.texture;
    let geometry = new THREE.SphereGeometry( radius * 2, 32, 32);
    let material = new THREE.MeshBasicMaterial( {color: texture} );
    let planet = new THREE.Mesh(geometry, material);
    return planet;
}

loadScene();