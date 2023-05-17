/* 
    NOTE: Not connected to the actual project, it's just here so
    I can code shaders easier with syntax highlighting & linting
    rather than the continous white text >:(
        also if I wanted to mass comment out code quickly I can,
        because doing it in HTML comments out the glsl code in
        <!-- --> tags... not //.

    I would actually like to do a src import within the <script> tag
    so that I can just code in here instead (and would look nice) 
    but it doesn't seem to link them together.
*/

// Vertex Shader /////////////////////////////////////////////////
varying vec3 vertexColor;

void main() {
    vertexColor = normalize(position.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment Shader ///////////////////////////////////////////////
uniform float time;
varying vec3 vertexColor; // Carried over from vertexShader

void main() {
    float sinValue = 0.1 * sin(gl_FragCoord.x) + 0.1 * cos(gl_FragCoord.y) + tan(gl_FragCoord.x + gl_FragCoord.y);
    vec3 color = vertexColor + vec3(sinValue);
    gl_FragColor = vec4(color, 1.0);
}