precision mediump float;

uniform sampler2D velocity;
uniform sampler2D pressure;
uniform float redMax;
uniform float redMin;
uniform float redRate;
uniform float greenMax;
uniform float greenMin;
uniform float greenRate;
uniform float blueMax;
uniform float blueMin;
uniform float blueRate;
varying vec2 uv;

void main(){
    gl_FragColor = vec4(
        max(redMax - texture2D(velocity, uv).x * redRate, redMin),
        max(greenMax - texture2D(velocity, uv).y * greenRate, greenMin),
        max(blueMax - (texture2D(pressure, uv)).x * blueRate, blueMin),
    1.0);
}
