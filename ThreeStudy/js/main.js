/**
 * basic tutorial in WebGL with three.js
 */

var Game = function() {

	this._init = function() {
		console.info('init game...');
		objects = new Array();
		scene = this._getScene();
		width = document.body.clientWidth;
		height = document.body.clientHeight;
		renderer = this._getWebGLRenderer(width, height);
		// camera
		camera = this._getCamera(45, width / height, 0.1, 10000);

		camera.position.z = 600;
		camera.position.y = 150;

		camera.rotation.x = 50;
		// camera.rotation.y = 180;
		scene.add(camera);
		// $container.append(renderer.domElement);

		// lights
		// scene.add(this._getLights(10, 50, 130));
		scene.add(this._getSpotLight(170, 330, -160));

		// add objects
		plane = this._getPlane();
		scene.add(plane);
		cube = this._getCube(50, 50, 50, 0, 0, 0, false, false);
		litCube = this._getCube(50, 50, 50, 0, 50, 0, true, true);
		scene.add(cube);
		scene.add(litCube);
		graph = this._getGrid();

		scene.add(graph);

		scene.add(this._getText('Sonecabr'));
		
		this._render(renderer, scene, camera);

		this._animate(new Date().getTime());

		window.addEventListener('resize', function() {
			renderer.setSize(document.body.clientWidth,
					document.body.clientHeight);
		});
		
		
		var gui = new dat.GUI();
		gui.add(cube.scale, 'x').min(0.1).max(10).step(0.1);
		gui.add(cube.scale, 'y', 0.1, 10, 0.1);
		gui.add(cube.scale, 'z', 0.1, 10, 0.1);

	};
	
	this._getText = function(text){
		var c = document.createElement('canvas');
		c.getContext('2d').font = '50px Arial';
		c.getContext('2d').fillText(text, 2, 50);
		var tex = new THREE.Texture(c);
		tex.needsUpdate = true;
		var mat = new THREE.MeshBasicMaterial({map : tex});
		mat.transparent = true;
		
		var titleQuad = new THREE.Mesh(new THREE.PlaneGeometry(c.width, c.height), mat);
		titleQuad.doubleSized = true;
		
		return titleQuad;
		
	};

	this._getGrid = function() {
		var grid = [ 10, 20, 30, 40 ];
		var barGraph = new THREE.Object3D();
		// scene.add(barGraph);

		var max = 10;
		var mat = new THREE.MeshLambertMaterial({
			color : 0xFFAA55
		});
		for ( var j = 0; j < grid.length; j++) {
			for ( var i = 0; i < grid[j].length; i++) {
				var barHeight = grid[j][i] / max * 80;
				var geo = new THREE.CubeGeometry(8, barHeight, 8);
				var mesh = new THREE.Mesh(geo, mat);
				mesh.position.x = (i - grid[j].length / 2) * 16;
				mesh.position.y = barHeight / 2;
				mesh.position.z = -(j - grid.length / 2) * 16;
				mesh.castShadow = mesh.receiveShadow = true;
				barGraph.add(mesh);
			}
		}

		return barGraph;

	};

	this._getCamera = function(angle, aspect, near, far) {
		return new THREE.PerspectiveCamera(angle, aspect, near, far);
	};

	this._getWebGLRenderer = function(width, height) {
		renderer = new THREE.WebGLRenderer({
			antialias : true
		});
		renderer.setSize(width, height);
		renderer.setClearColorHex(0xEEEEEE, 1.0);
		renderer.clear();
		renderer.shadowMapEnabled = true;
		return renderer;
	};

	this._getScene = function() {
		scene = new THREE.Scene();
		return scene;

	};

	this._updatePosition = function(objectIndex, x, y, z) {
		objects[objectIndex].position.x = x;
		objects[objectIndex].position.y = y;
		objects[objectIndex].position.z = z;
	};

	this._render = function() {
		renderer.render(scene, camera);
		document.body.appendChild(renderer.domElement);
	};

	this._getSphere = function(radius, segments, rings) {
		var sphereMaterial = new THREE.MeshLambertMaterial({
			color : 0xCC0000
		});
		var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments,
				rings), sphereMaterial);

		return sphere;
	};

	this._getPlane = function() {
		var planeGeo = new THREE.PlaneGeometry(400, 200, 10, 10);
		var planeMat = new THREE.MeshLambertMaterial({
			color : 0xff0000
		});
		var plane = new THREE.Mesh(planeGeo, planeMat);
		plane.rotation.x = -Math.PI / 2;
		plane.position.y = -25;
		plane.receiveShadow = true;
		return plane;
	};

	this._getCube = function(x, y, z, posX, posY, posZ, castShadow,
			receiveShadow) {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(x, y, z),
				new THREE.MeshLambertMaterial({
					color : 0xffffff
				}));
		cube.position.set(posX, posY, posZ);
		cube.castShadow = castShadow;
		cube.receiveShadow = receiveShadow;
		return cube;
	};

	this._getLights = function(x, y, z) {
		pointLight = new THREE.PointLight(0xFFFFFF);
		pointLight.position.x = x;
		pointLight.position.y = y;
		pointLight.position.z = z;

		return pointLight;
	};

	this._getSpotLight = function(x, y, z) {
		spot = new THREE.SpotLight(0xffffff);
		spot.position.set(x, y, z);
		spot.castShadow = true;
		return spot;
	};

	that = this;
	this._animate = function(t) {
		// camera.position.x = Math.sin(t / 1000) * 300;
		// camera.position.y = 150;
		// camera.position.z = Math.cos(t / 1000) * 300;

		litCube.position.x = Math.cos(t / 600) * 85;
		litCube.position.y = 60 - Math.sin(t / 900) * 25;
		litCube.position.z = Math.sin(t / 600) * 85;
		litCube.rotation.x = t / 500;
		litCube.rotation.y = t / 800;

		// you need update lookAt every frame
		// camera.lookAt(scene.position);
		renderer.render(scene, camera);
		window.requestAnimationFrame(that._animate, renderer.domElement);

	};
};
