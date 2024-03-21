// Obtener el contexto WebGL del canvas
const canvas = document.getElementById('webgl-canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    alert('WebGL no está disponible');
}

// Definir la posición de los vértices del cuadrado
const vertices = new Float32Array([
    -0.5,  0.5, // Vértice superior izquierdo
     0.5,  0.5, // Vértice superior derecho
    -0.5, -0.5, // Vértice inferior izquierdo
     0.5, -0.5  // Vértice inferior derecho
]);

// Crear un buffer para almacenar los vértices del cuadrado
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Asociar el buffer de vértices al atributo de posición en el shader
const vertexShaderSource = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentShaderSource = `
precision mediump float;
void main() {
    gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0); // Color verde oscuro
}`;

// Crear y compilar los shaders
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Crear el programa de shader y enlazarlo
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Asociar el buffer de vértices con el atributo de posición en el shader
const positionLocation = gl.getAttribLocation(shaderProgram, 'position');
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Dibujar el cuadrado
gl.clearColor(0.0, 0.0, 0.0, 1.0); // Fondo negro
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
