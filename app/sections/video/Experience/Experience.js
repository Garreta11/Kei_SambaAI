import * as THREE from 'three';

import Camera from './Camera';
import Renderer from './Renderer';
import World from './World';
import Sizes from './Utils/Sizes';

export default class Experience {
  static instance;
  constructor(_options = {}) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    // Options
    this.targetElement = _options.targetElement;
    if (!this.targetElement) {
      console.warn("Missing 'targetElement' property");
      return;
    }

    this.sizes = new Sizes();

    this.videoUrl = _options.videoUrl;

    this.setConfig();
    this.setScene();
    this.setCamera();
    this.setRenderer();
    this.setWorld();

    // Resize event listener
    this.setResizeListener();

    // update
    this.update();
  }

  setConfig() {
    this.config = {};

    // Debug
    this.config.debug = window.location.hash === '#debug';

    // Pixel ratio
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

    // Width and height
    const boundings = this.targetElement.getBoundingClientRect();
    this.config.width = boundings.width;
    this.config.height = boundings.height || window.innerHeight;
  }

  setScene() {
    this.scene = new THREE.Scene();
  }

  setCamera() {
    this.camera = new Camera();
  }

  setRenderer() {
    this.renderer = new Renderer({ rendererInstance: this.rendererInstance });

    this.targetElement.appendChild(this.renderer.instance.domElement);
  }

  setWorld() {
    this.world = new World();
  }

  setResizeListener() {
    this.sizes.on('resize', () => {
      // Update camera aspect ratio and projection matrix
      if (this.camera) {
        this.camera.instance.aspect = this.sizes.width / this.sizes.height;
        this.camera.instance.updateProjectionMatrix();
      }

      // Update renderer size
      if (this.renderer) {
        this.renderer.instance.setSize(this.sizes.width, this.sizes.height);
        this.renderer.instance.setPixelRatio(
          Math.min(window.devicePixelRatio, 2)
        );
      }
    });
  }

  update() {
    if (this.camera) this.camera.update();
    if (this.renderer) this.renderer.update();

    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}
