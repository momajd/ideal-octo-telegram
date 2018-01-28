/* global THREE */

class ViewNode {
  constructor(nodeData, view) {
    this.view = view;
    this.geometry = new THREE.SphereGeometry(0.5, 8, 8);
    this.material = new THREE.MeshPhongMaterial({color: 0x0000ff});
    this.sphere = new THREE.Mesh(this.geometry, this.material);

    this.sphere.position.set(nodeData.x_coord, nodeData.y_coord, nodeData.z_coord);
  }

  addToScene () {
    this.view.scene.add(this.sphere);
  }

  removeFromScene() {
    this.view.scene.remove(this.sphere);
  }
}

export default ViewNode;
