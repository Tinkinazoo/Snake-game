export const initWebGL = (canvas: HTMLCanvasElement): WebGLRenderingContext | null => {
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
  
  if (!gl) {
    console.error('Unable to initialize WebGL. Your browser may not support it.');
    return null;
  }
  gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
  return gl as WebGLRenderingContext;
};