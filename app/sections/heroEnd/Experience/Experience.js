import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Pane } from 'tweakpane';

import Time from './Utils/Time.js';
import Stats from './Utils/Stats.js';
import Sizes from './Utils/Sizes.js';
import Mouse from './Utils/Mouse.js';

import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Resources from './Resources.js';
import World from './World.js';

import assets from './assets.js';

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
    this.videoWall = _options.videoElement;

    this.time = new Time();
    this.sizes = new Sizes();

    this.setConfig();
    this.setStats();
    this.setDebug();
    this.setMouse();

    // threejs
    this.setScene();
    this.setCamera();
    this.setRenderer();
    // this.setControls();
    // this.setResources();
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

  setStats() {
    if (this.config.debug) {
      this.stats = new Stats(true);
    }
  }

  setDebug() {
    if (this.config.debug) {
      this.debug = new Pane();
      this.debug.containerElem_.style.width = '320px';
    }
  }

  setMouse() {
    this.mouse = new Mouse();
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

  setControls() {
    // Create OrbitControls
    this.controls = new OrbitControls(
      this.camera.instance,
      this.renderer.instance.domElement
    );
    this.controls.enableDamping = false; // Enable smooth controls
    // to disable zoom
    this.controls.enableZoom = false;
  }

  setResources() {
    this.resources = new Resources(assets);
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

  // Update
  update() {
    if (this.stats) this.stats.update();
    if (this.camera) this.camera.update();
    if (this.world) this.world.update();
    if (this.controls) this.controls.update();
    if (this.renderer) this.renderer.update();

    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}
