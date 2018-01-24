import ViewNode from './view_node';
/* global THREE */

class View {
  constructor(truss) {
    this.createScene();

    this.truss = truss;
    this.viewNodes = {};

    this.truss.nodes.forEach(node => this.addNode(node));
  }

  createScene () {
    let threeJsContainer = document.getElementById('three-js-container');
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(threeJsContainer.offsetWidth, threeJsContainer.offsetHeight);
    threeJsContainer.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, threeJsContainer.offsetWidth / threeJsContainer.offsetHeight, 0.1, 500);
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xcccccc );

    this.controls = new THREE.TrackballControls( this.camera, threeJsContainer );
		this.controls.rotateSpeed = 1.0;
		this.controls.zoomSpeed = 1.2;
		this.controls.panSpeed = 0.8;
		this.controls.noZoom = false;
		this.controls.noPan = false;
		this.controls.staticMoving = true;
		this.controls.dynamicDampingFactor = 0.3;
		this.controls.addEventListener( 'change', this.render.bind(this) );

    let render = this.render.bind(this);
    let controls = this.controls;
    function animate() {
    	requestAnimationFrame( animate );
			render();
			controls.update();
    }
    animate();

    this.render();
  }

  addNode (nodeData) {
    let viewNode = new ViewNode(nodeData, this);
    this.viewNodes[nodeData.id] = viewNode;
    viewNode.addToScene();
    this.render();
  }

  removeNode(id) {
    let node = this.viewNodes[id];
    delete this.viewNodes[id];
    node.removeFromScene();
    this.render();
  }

  addMember() {

  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

}

export default View;
