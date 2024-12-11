#define M_PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main() {

  // Position
  vec4 viewPosition = viewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewPosition;

  vUv = uv;
}