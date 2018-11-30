function loadScene(){
    const solarRadius = 695700;
    const mercuryRadius = 2440;
    const venusRadius = 6050;
    const earthRadius = 6371;
    const marsRadius = 3390;
    const jupiterRadius = 69911;
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
    let sun = planetMeshFactory({radius: solarRadius, texture: 0xFFFF00});
    let mercury = planetMeshFactory({radius: mercuryRadius, texture: 0x97979F});
    let venus = planetMeshFactory({radius: venusRadius, texture: 0xE5E3DB});
    let earth = planetMeshFactory({radius: earthRadius, texture: 0x00FF00});
    let mars = planetMeshFactory({radius: marsRadius, texture: 0xFF0000});
    let jupiter = planetMeshFactory({radius: jupiterRadius, texture: 0xE3DCCB});
    let saturn = planetMeshFactory({radius: saturnRadius, texture: 0xE5E3DB});
    let uranus = planetMeshFactory({radius: uranusRadius, texture: 0x8DA1AC});
    let neptune = planetMeshFactory({radius: neptuneRadius, texture: 0x44667F});
    let model_data = [
        {id: sun, distance: 0},
        {id: mercury, distance: 57909050},
        {id: venus, distance: 108200000},
        {id: earth, distance: 149600000},
        {id: mars, distance: 227900000},
        {id: jupiter, distance: 483800000},
        {id: saturn, distance: saturnDistance},
        {id: uranus, distance: uranusDistance},
        {id: neptune, distance: neptuneDistance}
    ];
    positionAllInSpace(scene, model_data);
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


function positionAllInSpace(scene, planets_data){ // add all planets to model
    planets_data.forEach(function(distance_data){
        let bodyname = distance_data.id;
        let distance = distance_data.distance;
        scene.add(bodyname);
        bodyname.position.set(distance, 0, 0);
    });
}

loadScene();