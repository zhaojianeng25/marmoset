class YxChar3d extends layapan.LayaSceneChar{
    constructor() {
        
        super();
    }
    public moveTopos(v: Pan3d.Vector2D): void {
        this.moveToPosV2d = v;
        var $nmr: Pan3d.Vector2D = this.pixelPos.sub(this.moveToPosV2d);
        this.pRotationY  = 180-Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI;        	
    }
    public set2dPos($x: number, $y: number): void {
        super.set2dPos($x, $y);
        this.pixelPos = new Pan3d.Vector2D($x, $y)
        this.rotationX = -30
    }
    private pixelPos: Pan3d.Vector2D
    private moveToPosV2d: Pan3d.Vector2D;
 


}