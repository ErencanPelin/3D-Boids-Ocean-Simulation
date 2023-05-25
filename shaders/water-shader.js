import { Uniforms } from "./uniforms.js"

export const WaterShader = {

    uniforms: { Uniforms },

    vertexShader: `
        #include <fog_pars_vertex>

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

            #include <begin_vertex>
            #include <project_vertex>

            gl_Position.y += noise.y;

            #include <fog_vertex>
        }
        `,
    fragmentShader: `
            #include <common>
            #include <fog_pars_fragment>

            uniform sampler2D noiseNormal;
            uniform sampler2D noiseZIn;
            uniform sampler2D noiseZOut;
            uniform sampler2D framebuffer;

            uniform float time;
            uniform float scroll_speed;
            uniform float intensity;
            uniform float foam_scale;
            uniform float foam_amount;

            uniform float refraction;
            uniform float refraction_scale;

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

                /* REFRACTION */

                // Calculate screen UV
                vec2 screen_uv = vScreen_uv.xy;
                screen_uv /= vScreen_uv.w;
                screen_uv += 1.0;
                screen_uv /= 2.0;


                // Calculate refraction offset
                // Simple refraction (first attempt, unused)
                // vec2 ref_offset = screen_uv.xy - vec2(0.0, refraction);
                // vec4 ref_tex = texture(framebuffer, ref_offset); 

                // Complex refraction
                vec3 ref_normal = vNormal;
                vec4 ref_noiseNormal = scrolling_noise(scroll_speed, noiseNormal, vUv * refraction_scale);
                vec4 ref_noiseZIn = scrolling_noise((scroll_speed * 5.0) * refraction_scale, noiseNormal, vUv * refraction_scale * 5.0);
                vec4 ref_noiseZOut = mix(ref_noiseNormal, ref_noiseZIn, 0.1);
                vec2 ref_ofs = screen_uv - ref_normal.xy * dot(ref_noiseZOut, vec4(1.0, 0.0, 0.0, 0.0) * 0.2);
                vec4 ref_tex = texture(framebuffer, ref_ofs) * refraction;

                gl_FragColor = noise * intensity;
                gl_FragColor.rgb += ref_tex.rgb;

                #include <fog_fragment>
            }
        `
}