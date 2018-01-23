import * as THREE from 'three';
import ViewNode from './view_node';

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
