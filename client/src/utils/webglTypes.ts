// Типы для WebGL контекста и связанных объектов
export interface WebGLProgramExt extends WebGLProgram {
  _program?: WebGLProgram;
}

export interface WebGLShaderExt extends WebGLShader {
  _shader?: WebGLShader;
}

export interface WebGLBufferExt extends WebGLBuffer {
  _buffer?: WebGLBuffer;
}

export interface WebGLTextureExt extends WebGLTexture {
  _texture?: WebGLTexture;
}

export interface WebGLFramebufferExt extends WebGLFramebuffer {
  _framebuffer?: WebGLFramebuffer;
}

export interface WebGLRenderbufferExt extends WebGLRenderbuffer {
  _renderbuffer?: WebGLRenderbuffer;
}

// Типы для униформ и атрибутов
export type UniformType = 
  | '1f' | '1fv' | '1i' | '1iv'
  | '2f' | '2fv' | '2i' | '2iv'
  | '3f' | '3fv' | '3i' | '3iv'
  | '4f' | '4fv' | '4i' | '4iv'
  | 'Matrix2fv' | 'Matrix3fv' | 'Matrix4fv';

export interface UniformInfo {
  name: string;
  type: UniformType;
  location: WebGLUniformLocation | null;
  value: any;
}

export interface AttributeInfo {
  name: string;
  size: number;
  type: number;
  location: number;
  normalized: boolean;
  stride: number;
  offset: number;
}

// Типы для шейдеров
export interface ShaderSource {
  vertex: string;
  fragment: string;
}

export interface ShaderProgram {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation>;
  attributes: Record<string, number>;
}

// Типы для буферов
export interface BufferSpec {
  data: Float32Array | Uint16Array;
  type: number;
  usage: number;
  normalize?: boolean;
}

// Типы для вершин
export interface VertexSpec {
  position: number[];
  color?: number[];
  texCoord?: number[];
  normal?: number[];
}

// Типы для матриц
export type Mat4 = Float32Array; // 4x4 матрица
export type Mat3 = Float32Array; // 3x3 матрица
export type Vec3 = Float32Array; // 3D вектор
export type Vec4 = Float32Array; // 4D вектор
export type Vec2 = Float32Array; // 2D вектор

// Интерфейс для WebGL утилит
export interface WebGLUtils {
  createProgram(
    gl: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ): WebGLProgram | null;
  
  createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ): WebGLShader | null;
  
  initWebGL(canvas: HTMLCanvasElement): WebGLRenderingContext | null;
}

// Дополнительные типы для работы с WebGL
export interface WebGLContextAttributesExt extends WebGLContextAttributes {
  antialias?: boolean;
  depth?: boolean;
  stencil?: boolean;
  alpha?: boolean;
  premultipliedAlpha?: boolean;
  preserveDrawingBuffer?: boolean;
  powerPreference?: 'default' | 'high-performance' | 'low-power';
  failIfMajorPerformanceCaveat?: boolean;
}

// Типы для текстур
export interface TextureOptions {
  level?: number;
  internalFormat?: number;
  width?: number;
  height?: number;
  border?: number;
  srcFormat?: number;
  srcType?: number;
  format?: number;
  type?: number;
  wrapS?: number;
  wrapT?: number;
  minFilter?: number;
  magFilter?: number;
  flipY?: boolean;
  premultiplyAlpha?: boolean;
}

// Типы для рендеринга
export interface RenderOptions {
  clearColor?: [number, number, number, number];
  clearDepth?: number;
  enableDepthTest?: boolean;
  depthFunc?: number;
  viewport?: [number, number, number, number];
  blend?: boolean;
  blendFunc?: [number, number];
}
