export const SandShader = {

    // essentially the shader that moves the vertices
    vertexShader: `
        uniform sampler2D noiseNormal;
        uniform sampler2D sandTexture;
        uniform float time;
        uniform float scroll_speed;
        uniform float sand_height;

        varying vec2 vUv;
        varying vec4 vScreen_uv;
        varying vec3 vNormal;

        vec4 scrolling_noise(float speed, sampler2D tex)
        {
            vec3 uv = vec3(vUv, 1.0);
            float s = time / (1.0 / speed);
            uv = s + uv;

            return texture(tex, uv.xy);
        }

        void main()
        {
            #include <begin_vertex>
            #include <project_vertex>
            #include <fog_vertex>

            vNormal = normalize(normalMatrix * normal);
            vUv = uv;
            vUv *= 1.0; // Controls the scale of the entire texture. Default: 1
            vScreen_uv = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            // Displaces the vertices based on the noise texture
            vec4 noiseNormal_texture = scrolling_noise(scroll_speed / 2.0, noiseNormal);

            noiseNormal_texture *= sand_height;

            // Changes the brightness of the peaks to be darker than the troughs
            // noiseNormal_texture *= -1.0;

            vec4 noise = noiseNormal_texture;
            noise = mix(noiseNormal_texture, noiseNormal_texture, 0.1);

            gl_Position.y += noise.y;
        }`,
    
    // and this is the shader that colours every texel on the surface
    fragmentShader: `
        // uniform sampler2D noiseNormal;
        uniform sampler2D noiseNormal;
        uniform sampler2D sandTexture;

        uniform float time;
        uniform float scroll_speed;
        uniform float intensity;

        varying vec2 vUv;
        varying vec4 vScreen_uv;
        varying vec3 vNormal;

        vec4 scrolling_noise(float speed, sampler2D tex, vec2 uv_p)
        {
            vec3 uv = vec3(vUv, 1.0);
            float s = time / (1.0 / speed);
            uv = s + uv;

            return texture(tex, uv.xy);
        }

        void main()
        {
            /* ALBEDO */

            // To keep the colour in-sync with the vertexShader
            vec4 noiseNormal_texture = scrolling_noise(scroll_speed / 2.0, noiseNormal, vUv);
            vec4 sandTexture_texture = scrolling_noise(scroll_speed / 2.0, sandTexture, vUv);

            vec4 noise = mix(noiseNormal_texture, sandTexture_texture, 0.5);
            noise *= vec4(0.9, 0.9, 0.9, 0.15); // Change colour here

            gl_FragColor = noise * intensity;
        }
    `
}