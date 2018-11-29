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
    let sun = planetMeshFactory({radius: solarRadius, texture: 0xFFFF00});
    let mercury = planetMeshFactory({radius: mercuryRadius, texture: 0x97979F});
    let venus = planetMeshFactory({radius: venusRadius, texture: 0xE5E3DB});
    let earth = planetMeshFactory({radius: earthRadius, texture: 0x00FF00});
    let mars = planetMeshFactory({radius: marsRadius, texture: 0xFF0000});
    let jupiter = planetMeshFactory({radius: jupiterRadius, texture: 0xE3DCCB});
    let saturn = planetMeshFactory({radius: saturnRadius, texture: 0xE5E3DB};
    let uranus = planetMeshFactory({radius: uranusRadius, texture: 0x8DA1AC});
    let neptuneData = {radius: neptuneRadius, texture: 0x44667F};
    let neptune = planetMeshFactory(neptuneData);
    let model_data = [
        [sun, 0],
        [mercury, mercuryDistance],
        [venus, venusDistance],
        [earth, earthDistance],
        [mars, marsDistance],
        [jupiter, jupiterDistance],
        [saturn, saturnDistance],
        [uranus, uranusDistance],
        [neptune, neptuneDistance]
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

function positionInSpace(scene, planet, distance){ // add planet to model
    scene.add(planet);
    planet.position.set(distance, 0, 0);
}

function positionAllInSpace(scene, planets_data){ // add all planets to model
    planets_data.forEach(function(distance_data){
        let bodyname = distance_data[0];
        let distance = distance_data[1];
        scene.add(bodyname);
        bodyname.position.set(distance, 0, 0);
    });
}

loadScene();