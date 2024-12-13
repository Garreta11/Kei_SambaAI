import * as THREE from 'three';
import Experience from './Experience';

export default class Renderer {
  constructor() {
    this.experience = new Experience();

    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.isPaused = true;

    this.setInstance();
  }

  setInstance() {
    this.clearColor = '#010101';

    // Renderer
    this.instance = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.instance.setClearColor(this.clearColor, 0);
    this.instance.setSize(this.config.width, this.config.height);
    // this.instance.setPixelRatio(this.config.pixelRatio);

    this.context = this.instance.getContext();
  }

  update() {
    if (!this.isPaused) {
      this.instance.render(this.scene, this.camera.instance);
    }
  }
}
