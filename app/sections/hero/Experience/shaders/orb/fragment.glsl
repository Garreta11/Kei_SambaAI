const float PI = acos(-1.0);

varying vec2 vUv;
varying vec3 vPosition;
varying float vFresnel;

uniform vec2 uResolution;
uniform float uScale;
uniform float uSpeedLights;
uniform float uTime;

uniform vec3 uLightAColor;
uniform float uLightAIntensity;
uniform float uLightAAmplitude;
uniform float uLightAFrequency;
uniform int uLightAOctaves;
uniform float uLightASpeed;

uniform vec3 uLightBColor;
uniform float uLightBIntensity;
uniform float uLightBAmplitude;
uniform float uLightBFrequency;
uniform int uLightBOctaves;
uniform float uLightBSpeed;

uniform vec3 uLightCColor;
uniform float uLightCIntensity;
uniform float uLightCAmplitude;
uniform float uLightCFrequency;
uniform int uLightCOctaves;
uniform float uLightCSpeed;


// light
float square(float x) { return sign(sin(x * PI)) * 0.5 + 0.5; }
float ramps(float x) { return mod(x,1.0)*square(x); }
float smoothed_ramps(float x) { return smoothstep(0.0,1.0,ramps(x)); }
float steps(float x) { return floor(x / 2.0 + 0.5); }
float smoothed_ramps_step(float x) { return smoothed_ramps(x) + steps(x); }
mat2 rotate(float a) { return mat2(cos(a),sin(a),-sin(a),cos(a)); }
float sphere(vec3 o, float r) { return length(o) - r; }
vec3 fetch(vec3 o) {
    float time = uTime * uSpeedLights;
    float deform = time * 0.22 / 0.35;
    o.yz *= rotate(smoothed_ramps_step(time * 0.22 + 1.0) * PI / 4.0);
    o.xy *= rotate(smoothed_ramps_step(time * 0.22 + 0.5) * PI / 4.0);
    o.zx *= rotate(smoothed_ramps_step(time * 0.22) * PI / 4.0);
    o.z += 0.1 * sin(o.y * 10.0 + deform);
    o.x += 0.1 * sin(o.z * 10.0 + deform);
    o.y += 0.1 * sin(o.x * 10.0 + deform);
    
    // float object = sphere(o, 0.5);
    float object = sphere(o, 0.6);
    if (object < 0.0) {
        vec3 color = vec3(
            (sin(o.x * 10.0 + time * 10.22) + 1.0) * 0.012 + 0.02,
            (sin(o.y * 10.0 + time * 10.22) + 1.0) * 0.013 + 0.015,
            (sin(o.z * 10.0 + time * 0.22) + 1.0) * 0.032 + 0.02
        );
        color /= 4.0;
        return color;
    } else {
        return vec3(0.0);
    }
}

void main() {
    vec3 light = vec3(0.0);
    vec3 o = vec3(0.0, 0.0, -.5);
    vec3 d = normalize(vPosition);
    float t = 0.0;
    for (int i = 0; i < 80; i++) {
        t += 0.01;
        light += fetch(d * t + o);
    }

    vec3 fresnelColor = vec3(1.0);
    light = mix(light, fresnelColor, clamp(pow(max(0.0, vFresnel - 0.9), 3.0), 0.0, 1.0));


    gl_FragColor = vec4(light, 1.0);
}
