varying vec2 vUv;
uniform float uPixel;
uniform sampler2D uTexture;


void main() {
  vec2 pixelatedUv = floor(vUv * uPixel) / uPixel;
  vec4 color = texture2D(uTexture, pixelatedUv);
  gl_FragColor = vec4(color);
}