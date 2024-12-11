import Experience from './Experience';
import Plane from './Plane';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setPlane();
  }

  setPlane() {
    this.plane = new Plane();
  }
}
