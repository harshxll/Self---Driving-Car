class Segment{
    constructor(start,end){
        this.start=start;
        this.end=end;
    }
    includes(point){
        return this.start.equal(point)||this.end.equal(point);
    }
    equal(seg){
        return this.includes(seg.start)&&this.includes(seg.end);
    }
     draw(ctx,color="black",width=2){
        ctx.strokeStyle=color;
        ctx.lineWidth=width;
        ctx.beginPath();
        ctx.moveTo(this.start.x,this.start.y);
        ctx.lineTo(this.end.x,this.end.y);
        ctx.stroke();
        ctx.closePath();
     }
}