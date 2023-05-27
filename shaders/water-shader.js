import { Uniforms } from "./uniforms.js"

export const WaterShader = {

    uniforms: { Uniforms },

    vertexShader: `
        uniform sampler2D noiseNormal;
        uniform sampler2D noiseZIn;
        uniform float u_time;
        uniform float scroll_speed;
        uniform float wave_height;

        varying vec2 vUv;
        varying vec4 vScreen_uv;
        varying vec3 vNormal;

        vec4 scrolling_noise(float speed, sampler2D tex)
        {
            vec3 uv = vec3(vUv, 1.0);
            float s = u_time / (1.0 / speed);
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
            vUv *= 2.0;
            vScreen_uv = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            // vertex displacement
            vec4 noiseNormal_tex = scrolling_noise(scroll_speed / 2.0, noiseNormal);
            vec4 noiseZIn_tex = scrolling_noise(scroll_speed, noiseZIn);

            noiseNormal_tex *= wave_height;
            noiseZIn_tex *= wave_height;

            // invert waves
            noiseNormal_tex *= -1.0;
            noiseZIn_tex *= -1.0;

            vec4 noise = noiseNormal_tex * noiseZIn_tex;
            noise = mix(noiseNormal_tex, noiseZIn_tex, 0.5);

            gl_Position.y += noise.y;
        }
        `,
    fragmentShader: `
        uniform sampler2D noiseNormal;
        uniform sampler2D noiseZIn;
        uniform sampler2D noiseZOut;

        uniform float u_time;
        uniform float scroll_speed;
        uniform float intensity;
        uniform float foam_scale;
        uniform float foam_amount;

        varying vec2 vUv;
        varying vec4 vScreen_uv;
        varying vec3 vNormal;

        vec4 scrolling_noise(float speed, sampler2D tex, vec2 uv_p)
        {
            vec3 uv = vec3(uv_p, 1.0);
            float s = u_time / (1.0 / speed);
            uv = s + uv;

            return texture(tex, uv.xy);
        }

        void main()
        {
            /* ALBEDO */

            // Large waves
            vec4 noiseNormal_tex = scrolling_noise(scroll_speed / 2.0, noiseNormal, vUv);
            vec4 noiseZIn_tex = scrolling_noise(scroll_speed, noiseZIn, vUv);

            vec4 noise = mix(noiseNormal_tex, noiseZIn_tex, 0.5);
            noise *= vec4(0.21, 0.47, 0.87, 1.0);

            // Foam
            vec4 noiseZOut_tex = texture(noiseZOut, vUv);
            vec4 noise4_tex = scrolling_noise((scroll_speed / 3.0) * foam_scale, noiseZIn, vUv * foam_scale);
            vec4 stepped_noise = step(noise4_tex, noiseZOut_tex);
            // stepped_noise = pow(stepped_noise, vec4(0.5));

            noise = mix(noise, stepped_noise, foam_amount);

            gl_FragColor = noise * intensity;
        }
    `
}