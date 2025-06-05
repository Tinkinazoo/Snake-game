// glsl.d.ts
declare module '*.glsl' {
  const content: string;
  export default content;
}

declare module '*.vert' {
  const content: string;
  export default content;
}

declare module '*.frag' {
  const content: string;
  export default content;
}

interface WebGLRenderingContext {
  program: WebGLProgram | null;
}

interface WebGL2RenderingContext {
  program: WebGLProgram | null;
}

// Декларации для WebGL типов и констант
declare namespace WebGL {
  type GLenum = number;
  type GLboolean = boolean;
  type GLbitfield = number;
  type GLbyte = number;
  type GLshort = number;
  type GLint = number;
  type GLsizei = number;
  type GLsizeiptr = number;
  type GLubyte = number;
  type GLushort = number;
  type GLuint = number;
  type GLfloat = number;
  type GLclampf = number;
}

// Декларации для WebGL2 типов
declare namespace WebGL2 {
  type GLint64 = bigint;
  type GLuint64 = bigint;
  type GLhalfFloat = number;
  type GLsync = unknown;
  type GLintptr = number;
  type GLuint = number;
  type GLenum = number;
  type GLsizeiptr = number;
}

// Расширенные типы для WebGL
interface WebGLShader {}
interface WebGLProgram {}
interface WebGLBuffer {}
interface WebGLFramebuffer {}
interface WebGLRenderbuffer {}
interface WebGLTexture {}
interface WebGLUniformLocation {}
interface WebGLActiveInfo {}
interface WebGLShaderPrecisionFormat {}
interface WebGLContextAttributes {}
interface ImageData {}
interface HTMLImageElement {}
interface HTMLCanvasElement {}
interface HTMLVideoElement {}
interface ImageBitmap {}

// Дополнительные типы для матриц
interface Float32List extends ArrayLike<number> {}
interface Int32List extends ArrayLike<number> {}
interface Uint32List extends ArrayLike<number> {}

// Декларации для GLSL функций
declare interface Math {
  clamp(value: number, min: number, max: number): number;
  radians(degrees: number): number;
  degrees(radians: number): number;
  noise1(x: number): number;
  noise2(x: number, y: number): number;
  noise3(x: number, y: number, z: number): number;
  noise4(x: number, y: number, z: number, w: number): number;
}

// Декларации для WebGL методов
interface WebGLRenderingContext {
  createShader(type: WebGL.GLenum): WebGLShader | null;
  shaderSource(shader: WebGLShader, source: string): void;
  compileShader(shader: WebGLShader): void;
  getShaderParameter(shader: WebGLShader, pname: WebGL.GLenum): any;
  getShaderInfoLog(shader: WebGLShader): string | null;
  createProgram(): WebGLProgram | null;
  attachShader(program: WebGLProgram, shader: WebGLShader): void;
  linkProgram(program: WebGLProgram): void;
  getProgramParameter(program: WebGLProgram, pname: WebGL.GLenum): any;
  getProgramInfoLog(program: WebGLProgram): string | null;
  getAttribLocation(program: WebGLProgram, name: string): number;
  getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null;
  enableVertexAttribArray(index: number): void;
  vertexAttribPointer(
    index: number,
    size: number,
    type: WebGL.GLenum,
    normalized: boolean,
    stride: number,
    offset: number
  ): void;
  createBuffer(): WebGLBuffer | null;
  bindBuffer(target: WebGL.GLenum, buffer: WebGLBuffer | null): void;
  bufferData(target: WebGL.GLenum, data: BufferSource | null, usage: WebGL.GLenum): void;
  drawArrays(mode: WebGL.GLenum, first: number, count: number): void;
  uniformMatrix4fv(
    location: WebGLUniformLocation | null,
    transpose: boolean,
    value: Float32List
  ): void;
  clearColor(red: number, green: number, blue: number, alpha: number): void;
  clear(mask: WebGL.GLbitfield): void;
  viewport(x: number, y: number, width: number, height: number): void;
  useProgram(program: WebGLProgram | null): void;
}

// Константы WebGL
declare const WebGLRenderingContext: {
  readonly VERTEX_SHADER: WebGL.GLenum;
  readonly FRAGMENT_SHADER: WebGL.GLenum;
  readonly COMPILE_STATUS: WebGL.GLenum;
  readonly LINK_STATUS: WebGL.GLenum;
  readonly ARRAY_BUFFER: WebGL.GLenum;
  readonly STATIC_DRAW: WebGL.GLenum;
  readonly FLOAT: WebGL.GLenum;
  readonly TRIANGLES: WebGL.GLenum;
  readonly COLOR_BUFFER_BIT: WebGL.GLenum;
};
