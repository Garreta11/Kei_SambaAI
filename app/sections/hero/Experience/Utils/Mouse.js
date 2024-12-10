import EventEmitter from './EventEmitter.js';

export default class Mouse extends EventEmitter {
  constructor() {
    super();

    // Initialize mouse position
    this.position = { x: 0, y: 0 };

    // Bind event listener
    this._onMouseMove = this._onMouseMove.bind(this);

    // Add event listener
    window.addEventListener('mousemove', this._onMouseMove);
  }

  _onMouseMove(event) {
    // Update mouse position normalized between -1 and 1
    this.position.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.position.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Emit the position if needed
    this.emit('mousemove', this.position);
  }

  // Remove event listener when no longer needed
  destroy() {
    window.removeEventListener('mousemove', this._onMouseMove);
  }
}
