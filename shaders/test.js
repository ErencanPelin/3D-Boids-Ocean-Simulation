  // Load the sand texture
  const sand_texture = new THREE.TextureLoader().load("./assets/sand/Sand_001_COLOR.png");
  sand_texture.repeat.set(24, 24);

  // Load the perlin noise texture
  const perlin_noise_texture = new THREE.TextureLoader().load("./assets/noise/perlin-noise-normal.png");
  perlin_noise_texture.minFilter = THREE.NearestFilter;
  perlin_noise_texture.magFilter = THREE.NearestFilter;
  perlin_noise_texture.wrapS = THREE.RepeatWrapping;
  perlin_noise_texture.wrapT = THREE.RepeatWrapping;
  perlin_noise_texture.generateMipmaps = false;

  // Create a custom shader material
  const sandMaterial = new THREE.ShaderMaterial({
    uniforms: {
      sand_texture: { value: sand_texture },
      perlin_noise_texture: { value: perlin_noise_texture }
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D sand_texture;
      uniform sampler2D perlin_noise_texture;
      varying vec2 vUv;

      void main() {
        // Get the sand color
        vec4 sandColor = texture2D(sand_texture, vUv);

        // Get the perlin noise value
        float perlinNoise = texture2D(perlin_noise_texture, vUv).r;

        // Blend the sand color with the perlin noise value
        vec4 finalColor = mix(sandColor, vec4(1.0, 1.0, 0.0, 1.0), perlinNoise);

        gl_FragColor = finalColor;
      }
    `
  });

  const surface = new THREE.Mesh(geometry, sandmaterial);
  surface.position.y = -BoidSettings.worldSize * 0.65;
  surface.rotation.x = -Math.PI / 2;

  scene.add(surface);