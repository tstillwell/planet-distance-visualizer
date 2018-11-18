function loadScene(){
    const NEAR = 100;
    const far = 1e10;
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
    var scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, NEAR, far );
    controls = new THREE.OrbitControls(camera);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var sunGeometry = new THREE.SphereGeometry( solarRadius * 2, 32, 32 );
    var sunMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFF00} );
    var sun = new THREE.Mesh( sunGeometry, sunMaterial );
    var mercuryGeometry = new THREE.SphereGeometry( mercuryRadius * 2, 32, 32);
    var mercuryMaterial = new THREE.MeshBasicMaterial( {color: 0x97979F} );
    var mercury = new THREE.Mesh (mercuryGeometry, mercuryMaterial);
    var venusGeometry = new THREE.SphereGeometry( venusRadius * 2, 32, 32);
    var venusMaterial = new THREE.MeshBasicMaterial( {color: 0xE5E3DB} );
    var venus = new THREE.Mesh (venusGeometry, venusMaterial);
    var earthGeometry = new THREE.SphereGeometry( earthRadius * 2, 32, 32 );
    var earthMaterial = new THREE.MeshBasicMaterial( {color: 0x00FF00} );
    var earth = new THREE.Mesh (earthGeometry, earthMaterial);
    var marsGeometry = new THREE.SphereGeometry( marsRadius * 2, 32, 32);
    var marsMaterial = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
    var mars = new THREE.Mesh (marsGeometry, marsMaterial);
    var jupiterGeometry = new THREE.SphereGeometry( jupiterRadius * 2, 32, 32);
    var jupiterMaterial = new THREE.MeshBasicMaterial( {color: 0xE3DCCB} );
    var jupiter = new THREE.Mesh (jupiterGeometry, jupiterMaterial);
    var saturnGeometry = new THREE.SphereGeometry( saturnRadius * 2, 32, 32);
    var saturnMaterial = new THREE.MeshBasicMaterial( {color: 0xE5E3DB} );
    var saturn = new THREE.Mesh (saturnGeometry, saturnMaterial);
    var uranusGeometry = new THREE.SphereGeometry( uranusRadius * 2, 32, 32);
    var uranusMaterial = new THREE.MeshBasicMaterial( {color: 0x8DA1AC} );
    var uranus = new THREE.Mesh (uranusGeometry, uranusMaterial);
    var neptuneGeometry = new THREE.SphereGeometry( neptuneRadius * 2, 32, 32);
    var neptuneMaterial = new THREE.MeshBasicMaterial( {color: 0x44667f} );
    var neptune = new THREE.Mesh (neptuneGeometry, neptuneMaterial);
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
    var animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    };
    animate();
}


function planetMeshFactory(){ // Give mesh for each planet
    
}

loadScene();