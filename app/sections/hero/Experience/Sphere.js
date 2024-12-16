import * as THREE from 'three';
import gsap from 'gsap';
import Experience from './Experience';

import vertexShader from './shaders/sphere/vertex.glsl';
import fragmentShader from './shaders/sphere/fragment.glsl';

export default class Sphere {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.mouse = this.experience.mouse;

    this.isPoints = false;

    this.timeFrequency = 0.0002;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'sphere',
        expanded: false,
      });
    }
    this.setGeometry();
    this.setLights();
    this.setMaterial();
    this.setMesh();
  }

  setLights() {
    this.lights = {};

    // Light A - blue
    this.lights.a = {};
    this.lights.a.intensity = 1;
    this.lights.a.color = {};
    this.lights.a.color.value = '#008aff';
    this.lights.a.color.instance = new THREE.Color(this.lights.a.color.value);
    this.lights.a.spherical = new THREE.Spherical(1, 0.672, 1.002);

    // Light B - pink
    this.lights.b = {};
    this.lights.b.intensity = 1;
    this.lights.b.color = {};
    this.lights.b.color.value = '#d300ff';
    this.lights.b.color.instance = new THREE.Color(this.lights.b.color.value);
    this.lights.b.spherical = new THREE.Spherical(1, 1.696, -0.911);

    // Debug
    if (this.debug) {
      const lightsFolder = this.debugFolder.addFolder({
        title: 'Lights',
        expanded: false,
      });
      for (const _lightName in this.lights) {
        const light = this.lights[_lightName];
        const lightFolder = lightsFolder.addFolder({
          title: _lightName,
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
          .addBinding(light.spherical, 'phi', {
            label: 'phi',
            min: 0,
            max: Math.PI,
            step: 0.001,
          })
          .on('change', () => {
            this.material.uniforms[
              `uLight${_lightName.toUpperCase()}Position`
            ].value.setFromSpherical(light.spherical);
          });
        lightFolder
          .addBinding(light.spherical, 'theta', {
            label: 'theta',
            min: -Math.PI,
            max: Math.PI,
            step: 0.001,
          })
          .on('change', () => {
            this.material.uniforms[
              `uLight${_lightName.toUpperCase()}Position`
            ].value.setFromSpherical(light.spherical);
          });
      }
    }
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(0.5, 512, 512);
    this.geometry.computeTangents();
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uModelMatrix: { value: new THREE.Matrix4() },

        uMouse: { value: new THREE.Vector2(0, 0) },

        uLightAColor: { value: this.lights.a.color.instance },
        uLightAPosition: { value: new THREE.Vector3(1, 1, 1) },
        uLightAIntensity: { value: this.lights.a.intensity },

        uLightBColor: { value: this.lights.b.color.instance },
        uLightBPosition: { value: new THREE.Vector3(-1, -1, 0) },
        uLightBIntensity: { value: this.lights.b.intensity },

        uSubdivision: {
          value: new THREE.Vector2(
            this.geometry.parameters.widthSegments,
            this.geometry.parameters.heightSegments
          ),
        },

        uScale: { value: 0.779 },
        uTime: { value: 0.000297 },

        uDistortionFrequency: { value: 2.101 },
        uDistortionStrength: { value: 0.906 },
        uDisplacementFrequency: { value: 1.159 },
        uDisplacementStrength: { value: 0.058 },

        uFresnelOffset: { value: 0.971 },
        uFresnelMultiplier: { value: 2.409 },
        uFresnelPower: { value: 0.399 },
      },
      defines: {
        USE_TANGENT: '',
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    // debug
    if (this.debug) {
      this.debugFolder.addBinding(this.material.uniforms.uScale, 'value', {
        label: 'uScale',
        min: 0,
        max: 5,
        step: 0.001,
      });

      this.debugFolder.addBinding(this, 'timeFrequency', {
        min: 0,
        max: 0.001,
        step: 0.000001,
      });

      // Distortion
      this.debugDistortion = this.debugFolder.addFolder({
        title: 'Distortion',
        expanded: false,
      });
      this.debugDistortion.addBinding(
        this.material.uniforms.uDistortionFrequency,
        'value',
        { label: 'uDistortionFrequency', min: 0, max: 10, step: 0.001 }
      );

      this.debugDistortion.addBinding(
        this.material.uniforms.uDistortionStrength,
        'value',
        { label: 'uDistortionStrength', min: 0, max: 10, step: 0.001 }
      );

      // Displacement
      this.debugDisplacement = this.debugFolder.addFolder({
        title: 'Displacement',
        expanded: false,
      });
      this.debugDisplacement.addBinding(
        this.material.uniforms.uDisplacementFrequency,
        'value',
        { label: 'uDisplacementFrequency', min: 0, max: 5, step: 0.001 }
      );

      this.debugDisplacement.addBinding(
        this.material.uniforms.uDisplacementStrength,
        'value',
        { label: 'uDisplacementStrength', min: 0, max: 1, step: 0.001 }
      );

      // fresnel
      this.debugFresnel = this.debugFolder.addFolder({
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

  setMesh() {
    if (this.isPoints) {
      this.mesh = new THREE.Points(this.geometry, this.material);
    } else {
      this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
    this.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value += this.time.delta * this.timeFrequency;

    const targetRotationX = -this.mouse.position.y * 0.25 * Math.PI;
    const targetRotationY = this.mouse.position.x * 0.25 * Math.PI;

    this.mesh.rotation.x += (targetRotationX - this.mesh.rotation.x) * 0.05;
    this.mesh.rotation.y += (targetRotationY - this.mesh.rotation.y) * 0.05;

    // Update the model matrix uniform
    this.material.uniforms.uModelMatrix.value.copy(this.mesh.matrixWorld);

    // mouse
    this.material.uniforms.uMouse.value = new THREE.Vector2(
      this.mouse.position.x,
      this.mouse.position.y
    );
  }
}
