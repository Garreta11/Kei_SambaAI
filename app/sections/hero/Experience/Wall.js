import * as THREE from 'three';
import gsap from 'gsap';
import Experience from './Experience';

export default class Wall {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.video = this.experience.videoWall;

    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.setMesh();

    this.initAnimation();
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(0.5, 128, 128);
  }

  setTexture() {
    this.video.play();
    this.texture = new THREE.VideoTexture(this.video);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    // Scale down the UV mapping
    this.texture.repeat.set(2, 1); // Scale down to half size
    this.texture.offset.set(-1, 0); // Center the scaled texture
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      wireframe: false,
      side: THREE.BackSide,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.z = -101;
    this.scene.add(this.mesh);
  }

  initAnimation() {
    gsap.to(this.mesh.position, {
      z: -0.5,
      duration: 2,
      delay: 1,
      ease: 'power1.out',
    });
  }
}
