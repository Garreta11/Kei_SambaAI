import * as THREE from 'three';
import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;

    this.setInstance();
  }

  setInstance() {
    // Set up
    this.instance = new THREE.PerspectiveCamera(
      25,
      this.config.width / this.config.height,
      0.1,
      15
    );
    this.instance.rotation.reorder('YXZ');
    this.instance.position.set(0, 0, 6);

    this.scene.add(this.instance);
  }

  update() {}

  resize() {
    this.instance.aspect = this.config.width / this.config.height;
    this.instance.updateProjectionMatrix();

    this.instance.aspect = this.config.width / this.config.height;
    this.instance.updateProjectionMatrix();

    this.instance.aspect = this.config.width / this.config.height;
    this.instance.updateProjectionMatrix();
  }
}
