/* global THREE */

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

export default ViewNode;
