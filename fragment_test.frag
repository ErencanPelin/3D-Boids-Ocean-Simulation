// Source: shader tutorial series - episode 014 - water color
// https://www.youtube.com/watch?v=VxGfhPeeXqs&list=PL4neAtv21WOmIrTrkNO3xCyrxg4LKkrF7&index=15

// NOTE: Analysing fragmentShader code in here with glslCavnas

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution; // required to have u_ prefix
uniform float u_time; // same

void main(){
  vec2 coord = 6.0 * gl_FragCoord.xy / u_resolution; // Controls the scale of the shader

  // Warps the shader at different points
  for (int n = 1; n < 8; n++){
    float i = float(n);
    coord += vec2(0.7 / i * sin(i * coord.y + u_time + 0.3 * i) + 0.8, 0.4 / i * sin(coord.x + u_time + 0.3 * i) + 1.6);
  }

  // Intensifier
  coord *= vec2(0.7 / sin(coord.y + u_time + 0.3) + 0.8, 0.4 / sin(coord.x + u_time + 0.3) + 1.6);

  vec3 color = vec3(0.5 * sin(coord.x) + 0.5, 0.5 * sin(coord.y) + 0.5, sin(coord.x + coord.y));

  gl_FragColor = vec4(color, 1.0);
}