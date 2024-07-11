class Road {
    constructor(x,width,laneCount=4){
       this.x=x;
       this.width=width;
       this.laneCount=laneCount;
       this.left=this.x-this.width/2;
       this.right=this.x+this.width/2;
        const infinity=100000;
        this.top=-infinity;
        this.bottom=infinity;

        const topLeft={x:this.left,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const topRight={x:this.right,y:this.top};
        const bottomRight={x:this.right,y:this.bottom};


        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ]
    }

    getLaneCenter(index){
        const lineWidth=this.width/this.laneCount;
        return (Math.min(this.laneCount-1,index))*lineWidth+lineWidth/2+this.left;
    }

    draw(ctx){
        for(let i=1;i<=this.laneCount-1;i++){
            const x=lerp(this.left,this.right,i/this.laneCount);
            ctx.lineWidth=5;
            ctx.strokeStyle="white";
            ctx.setLineDash([20,20]);
        
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke()
        }
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath()
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        })
    }
}
