declare module marmoset {

    function embed(name: string, info: any): void
    class Scene {
        public load(value: any): void
        public draw(a: any): void
    }
    class Framebuffer {
        constructor(a?: any, b?: any);
    }
    class Texture {
        constructor(a?: any, b?: any);
    }
    class TextureCache {
        public static parseFile(a?: any, b?: any, c?: any): void
    }
    class Shader {
        public build(a: any, b: any): void
 
    }
    class WebViewer {
        public drawScene(): void
    }
    class Mesh {
        constructor(a?: any, b?: any, c?: any);
        public gl: any;
        public desc: any;
        public dynamicVertexData: any;
        public numSubMeshes: any;  
        public displayMatrix: any;
        public name: any;
        public modelMatrix: any;
        public origin: any;
        public stride: number;
        public vertexColor: any;
        public secondaryTexCoord: any;
        public indexCount: any;
        public indexTypeSize: any;
        public indexType: any;
        public indexBuffer: WebGLBuffer;
        public wireCount: any;
        public wireBuffer: any;
        public vertexCount: any;
        public vertexBuffer: WebGLBuffer;
        public bounds: any;
    }

    class Matrix {
        public static identity: any
    }
    class Vect {
        public static create: any
    }
    class Archive {
        public files: any
    }
  
    class ByteStream {
        constructor(value: any)
        public asString(): string
        public readBytes: any;

    }
    

    
    

}
