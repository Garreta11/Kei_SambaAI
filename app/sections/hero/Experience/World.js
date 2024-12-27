import Experience from './Experience';
import Sphere from './Sphere';
import Wall from './Wall';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.setSphere();
    this.setWall();
  }

  setSphere() {
    this.sphere = new Sphere();
  }

  setWall() {
    this.wall = new Wall();
  }

  update() {
    if (this.sphere) this.sphere.update();
  }

  resize() {}
}
