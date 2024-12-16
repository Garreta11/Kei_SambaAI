import * as THREE from 'three';
import Experience from './Experience';

import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

export default class Plane {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.loaded = this.experience.loaded;

    this.setVideo();
    this.loaded = true;
    this.setTexture();
    this.setGeometry();
    this.setMaterial();
    this.video.addEventListener('loadedmetadata', (e) => {
      this.setMesh();
    });
  }

  setVideo() {
    this.video = document.createElement('video');
    this.video.src = this.experience.videoUrl; // Replace with your video file path
    this.video.loop = true;
    this.video.muted = true;
    this.video.play();
  }

  setTexture() {
    this.videoTexture = new THREE.VideoTexture(this.video);
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
