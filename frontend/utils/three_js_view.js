import * as THREE from 'three';

class View {
  constructor(truss) {
    this.createScene();

    this.truss = truss;
    this.viewNodes = {};

    this.truss.nodes.forEach(node => this.addNode(node));
  }

  createScene () {
    let scene3d = document.getElementById('scene3d');
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(scene3d.offsetWidth, scene3d.offsetHeight);
    scene3d.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, scene3d.offsetWidth / scene3d.offsetHeight, 0.1, 500);
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
    // TODO Test
    let node = this.nodes[id];
    delete this.nodes[id];
    node.removeFromScene();
    this.render();
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

class ViewNode {
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
