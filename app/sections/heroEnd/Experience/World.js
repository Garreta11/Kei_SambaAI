import Experience from './Experience';
import Sphere from './Sphere';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.setSphere();
  }

  setSphere() {
    this.sphere = new Sphere();
  }

  setOrb() {
    this.orb = new Orb();
  }

  setParticles() {
    this.particles = new Particles();
  }

  update() {
    if (this.sphere) this.sphere.update();
    if (this.orb) this.orb.update();
    if (this.particles) this.particles.update();
  }

  resize() {}
}
