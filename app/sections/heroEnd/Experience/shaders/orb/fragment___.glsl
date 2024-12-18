varying vec3 vPosition;
varying float vFresnel;

uniform float uTime;
// Define three colors as uniforms
/* uniform vec3 uColor1; // Primary color
uniform vec3 uColor2; // Secondary color
uniform vec3 uColor3; // Tertiary color */

void main() {
    float d = -uTime * 0.1;
    float a = 0.0;

    for (float i = 0.0; i < 8.0; i++) {
        a += cos(i - d - a * vPosition.x);
        d += sin(vPosition.y * i + a);
    }

    d += uTime * 0.5;

    vec3 uColor1 = vec3(0.98, 0.0, 1.0);
    vec3 uColor2 = vec3(0.19, 0.65, 0.85);
    vec3 uColor3 = vec3(0.22, 0.02, 0.24);

    // Create a gradient factor
    float gradient = cos(d + a + vPosition.x * vPosition.y) * 0.5 + 0.5;

    // Interpolate between the colors based on the gradient
    vec3 col = mix(uColor1, uColor2, gradient); // Blend between color1 and color2
    col = mix(col, uColor3, sin(gradient * 3.14) * 0.5 + 0.5); // Add color3 for variation

    vec3 fresnelColor = vec3(1.0);
    col = mix(col, fresnelColor, clamp(pow(max(0.0, vFresnel - 0.8), 3.0), 0.0, 1.0));

    gl_FragColor = vec4(col, 1.0);
}
