export const initWebGL = (canvas: HTMLCanvasElement): WebGLRenderingContext | null => {
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as RenderingContext;
  
  if (!gl) {
    console.error('Unable to initialize WebGL. Your browser may not support it.');
    return null;
  }
  
  return gl as WebGLRenderingContext;
};
