export const WaterShader = {

    // essentially the shader that moves the vertices
    vertexShader: `
        uniform sampler2D noiseNormal;
        uniform sampler2D noiseZIn;
        uniform float time;
        uniform float scroll_speed;
        uniform float wave_height;

        varying vec2 vTextureCoord;

        vec4 generateScrollingNoise(float speed, sampler2D var_texture) {
            vec3 uv = vec3(vTextureCoord, 1.0);
            float scrollOffset = time / (1.0 / speed);
            uv = scrollOffset + uv;
            return texture(var_texture, uv.xy);
        }

        void main() {
            #include <begin_vertex>
            #include <project_vertex>
            #include <fog_vertex>

            vTextureCoord = uv;
            vTextureCoord *= 0.8; // Controls the scale of the entire texture. Default: 1

            // Displaces the vertices based on the noise texture
            vec4 noiseNormal_texture = generateScrollingNoise(scroll_speed / 2.0, noiseNormal);
            vec4 noiseZIn_texture = generateScrollingNoise(scroll_speed, noiseZIn);
            noiseNormal_texture *= wave_height;
            noiseZIn_texture *= wave_height;

            // Changes the brightness of the peaks to be darker than the troughs
            noiseNormal_texture *= -1.0;
            noiseZIn_texture *= -1.0;

            vec4 noise = noiseNormal_texture * noiseZIn_texture;
            noise = mix(noiseNormal_texture, noiseZIn_texture, 0.5);
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

        varying vec2 vTextureCoord;

        vec4 generateScrollingNoise(float speed, sampler2D var_texture, vec2 coordCurrentPixel) {
            vec3 uv = vec3(coordCurrentPixel, 1.0);
            float scrollOffset = time / (1.0 / speed);
            uv = scrollOffset + uv;
            return texture(var_texture, uv.xy);
        }

        void main() {
            // To keep the colour in-sync with the vertexShader
            vec4 noiseNormal_texture = generateScrollingNoise(scroll_speed / 2.0, noiseNormal, vTextureCoord);
            vec4 noiseZIn_texture = generateScrollingNoise(scroll_speed, noiseZIn, vTextureCoord);
            vec4 noise = mix(noiseNormal_texture, noiseZIn_texture, 0.5);
            noise *= vec4(0.1, 0.2, 1, 1.0); // Change colour here
            gl_FragColor = noise * intensity;
        }
    `
}