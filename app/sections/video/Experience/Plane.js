import * as THREE from 'three';
import Experience from './Experience';

import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

export default class Plane {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.loaded = this.experience.loaded;
    this.videoItem = this.experience.videoItem;

    // this.setVideo();

    this.setTexture(); // Initialize texture after video is loaded
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.loaded = true;
  }

  setVideo() {
    // Wait for the video to load before playing
    this.video.addEventListener('loadeddata', () => {
      videoItem.play();
      this.setTexture(); // Initialize texture after video is loaded
      this.setGeometry();
      this.setMaterial();
      this.setMesh();
    });
    // this.video.play();
  }

  setTexture() {
    this.videoTexture = new THREE.VideoTexture(this.videoItem);
    this.videoTexture.minFilter = THREE.LinearFilter;
    this.videoTexture.magFilter = THREE.LinearFilter;
    this.videoTexture.format = THREE.RGBFormat;
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(2, 2);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uPixel: { value: 2.0 },
        uTexture: { value: this.videoTexture },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });
  }
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }
}
