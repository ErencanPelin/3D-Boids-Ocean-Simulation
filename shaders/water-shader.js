export const WaterShader = {

    // essentially the shader that moves the vertices
    vertexShader: `
        uniform sampler2D noiseNormal;
        uniform sampler2D noiseZIn;
        uniform float time;
        uniform float scroll_speed;
        uniform float wave_height;

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
            vUv *= 0.8; // Controls the scale of the entire texture. Default: 1
            vScreen_uv = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            // Displaces the vertices based on the noise texture
            vec4 noiseNormal_tex = scrolling_noise(scroll_speed / 2.0, noiseNormal);
            vec4 noiseZIn_tex = scrolling_noise(scroll_speed, noiseZIn);

            noiseNormal_tex *= wave_height;
            noiseZIn_tex *= wave_height;

            // Changes the brightness of the peaks to be darker than the troughs
            noiseNormal_tex *= -1.0;
            noiseZIn_tex *= -1.0;

            vec4 noise = noiseNormal_tex * noiseZIn_tex;
            noise = mix(noiseNormal_tex, noiseZIn_tex, 0.1);

            gl_Position.y += noise.y;
        }`,
    
    // and this is the shader that colours every texel on the surface
    fragmentShader: `
        uniform sampler2D noiseNormal;
        uniform sampler2D noiseZIn;
        uniform sampler2D noiseZOut;

        uniform float time;
        uniform float scroll_speed;
        uniform float intensity;

        varying vec2 vUv;
        varying vec4 vScreen_uv;
        varying vec3 vNormal;

        vec4 scrolling_noise(float speed, sampler2D tex, vec2 uv_p)
        {
            vec3 uv = vec3(uv_p, 1.0);
            float s = time / (1.0 / speed);
            uv = s + uv;

            return texture(tex, uv.xy);
        }

        void main()
        {
            /* ALBEDO */

            // To keep the colour in-sync with the vertexShader
            vec4 noiseNormal_tex = scrolling_noise(scroll_speed / 2.0, noiseNormal, vUv);
            vec4 noiseZIn_tex = scrolling_noise(scroll_speed, noiseZIn, vUv);

            vec4 noise = mix(noiseNormal_tex, noiseZIn_tex, 0.5);
            noise *= vec4(0.1, 0.2, 1, 1.0); // Change colour here

            gl_FragColor = noise * intensity;
        }
    `
}