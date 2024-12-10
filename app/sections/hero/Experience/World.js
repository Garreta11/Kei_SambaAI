import Experience from './Experience';
// import Particles from './Particles';
import Sphere from './Sphere';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    /* this.resources.on('groupEnd', (_group) => {
      if (_group.name === 'base') {
        this.setSphere();
        // this.setParticles();
      }
    }); */
    this.setSphere();
  }

  setSphere() {
    this.sphere = new Sphere();
  }

  setParticles() {
    this.particles = new Particles();
  }

  update() {
    if (this.sphere) this.sphere.update();
    if (this.particles) this.particles.update();
  }

  resize() {}
}
