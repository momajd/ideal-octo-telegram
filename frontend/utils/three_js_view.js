import * as THREE from 'three';

class View {
  constructor(truss) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xcccccc );

    this.render();

    this.truss = truss;
    this.truss.nodes.forEach(node => this.addNode(node));
  }

  addNode (nodeData) {
    let node = new Node(nodeData, this);
    node.addToScene();
    this.render();
  }

  removeNode(id) {

  }

  addMember() {

  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

}

class Member {
  constructor(nearNode, farNode) {
    this.nearNode = nearNode;
    this.farNode = farNode;
  }
}

class Node {
  constructor(nodeData, view) {
    this.vector = new THREE.Vector3(nodeData.x_coord, nodeData.y_coord, 0);
    this.view = view;

    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push(this.vector);
    this.material = new THREE.PointsMaterial({ size: 6, sizeAttenuation: false, color: "#000000"});
    this.point = new THREE.Points(this.geometry, this.material);
  }

  addToScene () {
    this.view.scene.add(this.point);
  }

  removeFromScene() {
    this.view.scene.remove(this.point);
  }
}

export default View;
