// Obtener el contexto WebGL del canvas
const canvas = document.getElementById('webgl-canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    alert('WebGL no está disponible');
}

// Ejemplos de posiciones para los vértices del triángulo
// Descomenta uno de los siguientes bloques para probar diferentes posiciones

// Posición 1 (Centrado, Descomentado)
// const vertices = new Float32Array([
//     -0.5, -0.5,   // Vértice inferior izquierdo
//      0.0,  0.5,   // Vértice superior
//      0.5, -0.5    // Vértice inferior derecho
// ]);

// Posición 2 (Hacia la esquina superior derecha, Comentado)
// const vertices = new Float32Array([
//     0.0,  0.0,   // Vértice inferior izquierdo
//     0.5,  1.0,   // Vértice superior
//     1.0,  0.0    // Vértice inferior derecho
// ]);

// Posición 3 (Hacia la esquina inferior izquierda, Comentado)
const vertices = new Float32Array([
   -1.0, -1.0,   // Vértice inferior izquierdo
   -0.5, -0.5,   // Vértice superior
   -1.0,  0.0    // Vértice inferior derecho
]);

// Crear un buffer para almacenar los vértices del triángulo
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Crear y compilar los shaders
const vertexShaderSource = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}`;

// Ejemplos de colores para el triángulo
// Descomenta uno de los siguientes bloques para probar diferentes colores

// Color 1: Verde oscuro (Descomentado)
// const fragmentShaderSource = `
// precision mediump float;
// void main() {
//     gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0); // Verde oscuro
// }`;

// Color 2: Azul (Comentado)
// const fragmentShaderSource = `
// precision mediump float;
// void main() {
//     gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Azul
// }`;

// Color 3: Rojo (Comentado)
const fragmentShaderSource = `
precision mediump float;
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Rojo
}`;

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

// Dibujar el triángulo
gl.clearColor(0.0, 0.0, 0.0, 1.0); // Fondo negro
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);
