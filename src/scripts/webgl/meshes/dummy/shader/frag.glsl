uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;
varying float vDisplacement;

#define PI 3.1416

void main() {
    float f = smoothstep(sin(vDisplacement * PI * 6.) * dot(vUv.x, vUv.x) * 20., 0.0, 1.0);
    f -= smoothstep( 0.1, 0.15, vDisplacement );
    vec4 color = mix( vec4( uColor, 1.0 ), vec4( vUv.x, vUv.y, 1.0, 1.0 ), f * f);
    gl_FragColor = color;
}
