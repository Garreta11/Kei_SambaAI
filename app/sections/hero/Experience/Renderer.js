import * as THREE from 'three';
import Experience from './Experience';

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;
    this.debug = this.experience.debug;

    this.isPaused = true;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'renderer',
        expanded: false,
      });
    }

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
    this.instance.setPixelRatio(this.config.pixelRatio);
  }

  update() {
    if (!this.isPaused) {
      if (this.stats) {
        this.stats.beforeRender();
      }
      this.instance.render(this.scene, this.camera.instance);
      if (this.stats) {
        this.stats.afterRender();
      }
    }
  }

  resize() {
    // Instance
    this.instance.setSize(this.config.width, this.config.height);
    this.instance.setPixelRatio(this.config.pixelRatio);
  }
}
