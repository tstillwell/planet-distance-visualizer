function loadScene(){
    const near = 1;
    const far = 7.47e12;
    const solarRadius = 695700;
    const mercuryRadius = 2440;
    const venusRadius = 6050;
    const earthRadius = 6371;
    const marsRadius = 3390;
    const jupiterRadius = 69911;
    const saturnRadius = 36184;
    var scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    controls = new THREE.OrbitControls(camera);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var sunGeometry = new THREE.SphereGeometry( 100, 32, 32 );
    var sunMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFF00} );
    var sun = new THREE.Mesh( sunGeometry, sunMaterial );
    var mercuryGeometry = new THREE.SphereGeometry( 10, 32, 32);
    var mercuryMaterial = new THREE.MeshBasicMaterial( {color: 0x97979F} );
    var mercury = new THREE.Mesh (mercuryGeometry, mercuryMaterial);
    scene.add( sun );
    scene.add( mercury );
    mercury.position.set( 1000, 0, 0)
    camera.position.z = 100;
    var animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    };
    animate();
}

loadScene();