import * as THREE from 'three';
import gsap from 'gsap';
import Experience from './Experience';

import vertexShader from './shaders/orb/vertex.glsl';
import fragmentShader from './shaders/orb/fragment.glsl';

export default class Orb {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.time = this.experience.time;
    this.mouse = this.experience.mouse;

    this.timeFrequency = 0.001;

    this.setLights();
    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    this.setDebug();

    // this.initAnimation();
  }

  setLights() {
    this.lights = {};

    // Light A
    this.lights.a = {};
    this.lights.a.intensity = 1;
    this.lights.a.amplitude = 1;
    this.lights.a.frequency = 0.099;
    this.lights.a.octaves = 1;
    this.lights.a.speed = 1;
    this.lights.a.color = {};
    this.lights.a.color.value = '#A380C9';
    this.lights.a.color.instance = new THREE.Color(this.lights.a.color.value);

    // Light B
    this.lights.b = {};
    this.lights.b.intensity = 1;
    this.lights.b.amplitude = 2;
    this.lights.b.frequency = 0.025;
    this.lights.b.octaves = 2;
    this.lights.b.speed = 1;
    this.lights.b.color = {};
    this.lights.b.color.value = '#d300ff';
    this.lights.b.color.instance = new THREE.Color(this.lights.b.color.value);

    // Light C
    this.lights.c = {};
    this.lights.c.intensity = 0.917;
    this.lights.c.amplitude = 2.971;
    this.lights.c.frequency = 0.154;
    this.lights.c.octaves = 2;
    this.lights.c.speed = 0.514;
    this.lights.c.color = {};
    this.lights.c.color.value = '#5B97F7';
    this.lights.c.color.instance = new THREE.Color(this.lights.c.color.value);
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(1, 512, 512);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uScale: { value: 1.0 },
        uTime: { value: 0.0 },
        uFrequency: { value: 0.2 },
        uAmplitude: { value: 1 },

        // Distortion
        uDistortionFrequency: { value: 1.051 },
        uDistortionStrength: { value: 1.377 },
        // Displacement
        uDisplacementFrequency: { value: 0.58 },
        uDisplacementStrength: { value: 0.105 },
        uSpeedDeform: { value: 0.5 },
        uSpeedLights: { value: 0.3 },

        // Lights
        uLightAColor: { value: this.lights.a.color.instance },
        uLightAIntensity: { value: this.lights.a.intensity },
        uLightAAmplitude: { value: this.lights.a.amplitude },
        uLightAFrequency: { value: this.lights.a.frequency },
        uLightAOctaves: { value: this.lights.a.octaves },
        uLightASpeed: { value: this.lights.a.speed },

        uLightBColor: { value: this.lights.b.color.instance },
        uLightBIntensity: { value: this.lights.b.intensity },
        uLightBAmplitude: { value: this.lights.b.amplitude },
        uLightBFrequency: { value: this.lights.b.frequency },
        uLightBOctaves: { value: this.lights.b.octaves },
        uLightBSpeed: { value: this.lights.b.speed },

        uLightCColor: { value: this.lights.c.color.instance },
        uLightCIntensity: { value: this.lights.c.intensity },
        uLightCAmplitude: { value: this.lights.c.amplitude },
        uLightCFrequency: { value: this.lights.c.frequency },
        uLightCOctaves: { value: this.lights.c.octaves },
        uLightCSpeed: { value: this.lights.c.speed },

        // Fresnel
        uFresnelOffset: { value: 0.71 },
        uFresnelMultiplier: { value: 1.812 },
        uFresnelPower: { value: 0.507 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setDebug() {
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Orb',
        expanded: false,
      });

      // Shape
      this.shapeFolder = this.debugFolder.addFolder({
        title: 'Shape',
        expanded: false,
      });

      this.shapeFolder.addBinding(this.material.uniforms.uScale, 'value', {
        label: 'uScale',
        min: 0.1,
        max: 5,
        step: 0.001,
      });
      this.shapeFolder.addBinding(
        this.material.uniforms.uSpeedDeform,
        'value',
        {
          label: 'uSpeedDeform',
          min: 0.0,
          max: 1.0,
          step: 0.001,
        }
      );
      this.shapeFolder.addBinding(
        this.material.uniforms.uDistortionFrequency,
        'value',
        {
          label: 'uDistortionFrequency',
          min: 0,
          max: 10,
          step: 0.001,
        }
      );
      this.shapeFolder.addBinding(
        this.material.uniforms.uDistortionStrength,
        'value',
        {
          label: 'uDistortionStrength',
          min: 0,
          max: 10,
          step: 0.001,
        }
      );
      this.shapeFolder.addBinding(
        this.material.uniforms.uDisplacementFrequency,
        'value',
        {
          label: 'uDisplacementFrequency',
          min: 0,
          max: 5,
          step: 0.001,
        }
      );
      this.shapeFolder.addBinding(
        this.material.uniforms.uDisplacementStrength,
        'value',
        {
          label: 'uDisplacementStrength',
          min: 0,
          max: 1,
          step: 0.001,
        }
      );

      // Lights
      this.lightsFolder = this.debugFolder.addFolder({
        title: 'Lights',
        expanded: false,
      });
      this.lightsFolder.addBinding(
        this.material.uniforms.uSpeedLights,
        'value',
        {
          label: 'uSpeedLights',
          min: 0.0,
          max: 1,
          step: 0.001,
        }
      );

      for (const _lightName in this.lights) {
        const light = this.lights[_lightName];
        const lightFolder = this.lightsFolder.addFolder({
          title: 'Light ' + _lightName,
          expanded: false,
        });
        lightFolder
          .addBinding(light.color, 'value', {
            view: 'color',
            label: 'color',
          })
          .on('change', () => {
            light.color.instance.set(light.color.value);
          });
        lightFolder
          .addBinding(light, 'octaves', {
            min: 0,
            max: 5,
            step: 1,
          })
          .on('change', () => {
            this.material.uniforms[
              `uLight${_lightName.toUpperCase()}Octaves`
            ].value = light.octaves;
          });
        lightFolder
          .addBinding(light, 'speed', {
            min: 0,
            max: 5,
            step: 0.001,
          })
          .on('change', () => {
            this.material.uniforms[
              `uLight${_lightName.toUpperCase()}Speed`
            ].value = light.speed;
          });
        lightFolder
          .addBinding(light, 'intensity', {
            min: 0,
            max: 5,
            step: 0.001,
          })
          .on('change', () => {
            this.material.uniforms[
              `uLight${_lightName.toUpperCase()}Intensity`
            ].value = light.intensity;
          });
        lightFolder
          .addBinding(light, 'amplitude', {
            min: 0,
            max: 5,
            step: 0.001,
          })
          .on('change', () => {
            this.material.uniforms[
              `uLight${_lightName.toUpperCase()}Amplitude`
            ].value = light.amplitude;
          });
        lightFolder
          .addBinding(light, 'frequency', {
            min: 0,
            max: 5,
            step: 0.001,
          })
          .on('change', () => {
            this.material.uniforms[
              `uLight${_lightName.toUpperCase()}Frequency`
            ].value = light.frequency;
          });
      }

      // fresnel
      this.debugFresnel = this.lightsFolder.addFolder({
        title: 'Fresnel',
        expanded: false,
      });
      this.debugFresnel.addBinding(
        this.material.uniforms.uFresnelOffset,
        'value',
        { label: 'uFresnelOffset', min: -2, max: 2, step: 0.001 }
      );
      this.debugFresnel.addBinding(
        this.material.uniforms.uFresnelMultiplier,
        'value',
        { label: 'uFresnelMultiplier', min: 0, max: 5, step: 0.001 }
      );
      this.debugFresnel.addBinding(
        this.material.uniforms.uFresnelPower,
        'value',
        { label: 'uFresnelPower', min: 0, max: 5, step: 0.001 }
      );
    }
  }

  initAnimation() {
    console.log(this.camera);
    gsap.to(this.camera.instance.position, {
      z: 6,
      duration: 3,
      ease: 'power1.out',
    });
  }

  update() {
    this.material.uniforms.uTime.value += this.time.delta * this.timeFrequency;
  }
}
