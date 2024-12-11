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
    this.aspect = this.config.width / this.config.height;
    const frustumSize = 1; // Arbitrary scale factor
    this.instance = new THREE.OrthographicCamera(
      -frustumSize,
      frustumSize,
      frustumSize,
      -frustumSize,
      0,
      1
    );

    this.instance.position.z = 1;
  }

  update() {}
}
