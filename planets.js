function loadScene(){
    const near = 100;
    const far = 1e10;
    const solarRadius = 695700;
    const mercuryRadius = 2440;
    const mercuryDistance = 57909050;
    const venusRadius = 6050;
    const venusDistance = 108200000;
    const earthRadius = 6371;
    const earthDistance = 149600000;
    const marsRadius = 3390;
    const jupiterRadius = 69911;
    const saturnRadius = 36184;
    var scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, near, far );
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
    var earth = THREE.Mesh (earthGeometry, earthMaterial);
    scene.add( sun );
    scene.add( mercury );
    scene.add( venus );
    mercury.position.set( mercuryDistance, 0, 0);
    venus.position.set (venusDistance, 0, 0 );
    camera.position.z = 95000000;
    var animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    };
    animate();
}

loadScene();