//public vars
WIDTH = 400, HEIGHT = 300;
			
VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;

$container = $('#container');

renderer = new THREE.WebGLRenderer();

camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );

scene = new THREE.Scene();

objects = new Array();

var Game = {
			
	_init : function(){
		console.info('init game');
		this._setScene();
	},
	
	_setScene : function(){
		scene.add(camera);
		camera.position.z = 300;
		renderer.setSize(WIDTH, HEIGHT);
		$container.append(renderer.domElement);
		
		objects[0] = this._getSphere(50, 16, 16);
		objects[1] = this._getSphere(10, 16, 16);
		scene.add(objects[0]);
		scene.add(objects[1]);
		
		
		scene.add(this._getLights(10, 50, 130));
		scene.add(this._getLights(20, 60, 150));
		this._render();
		
	},
	
	_updatePosition : function(objectIndex, x, y, z){
		objects[objectIndex].position.x = x;
		objects[objectIndex].position.y = y;
		objects[objectIndex].position.z = z;
	},
	
	_render: function(){
		renderer.render(scene, camera);
	},
	_getSphere : function(radius, segments, rings){		
		var sphereMaterial = new THREE.MeshLambertMaterial(
			{
				color: 0xCC0000
			}
		);
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(
				radius,
				segments,
				rings),
			sphereMaterial
		);
		
		// set the geometry to dynamic
		// so that it allow updates
		sphere.geometry.dynamic = true;

		// changes to the vertices
		sphere.geometry.__dirtyVertices = true;

		// changes to the normals
		sphere.geometry.__dirtyNormals = true;

		return sphere;
	},
	
	_getLights : function(x, y, z){
		var pointLight = new THREE.PointLight(0xFFFFFF);
		pointLight.position.x = x;
		pointLight.position.y = y;
		pointLight.position.z = z;
		
		return pointLight;
	},
};


