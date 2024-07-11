class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=5;
        this.raySpread=Math.PI/2;
        this.rayLength=100;
        this.rays=[];

        this.readings=[];
    }

    update(roadBorders,traffic){
        this.readings=[];
        this.#castRays();
        for(let i=0;i<this.rays.length;i++){
            this.readings.push(this.#getReadings(this.rays[i],roadBorders,traffic))
        }
    }

    #getReadings(ray,roadBorders,traffic){
        const touches=[];
        for(let i=0;i<roadBorders.length;i++){
            const touch=getIntersection(ray[0],ray[1],roadBorders[i][0],roadBorders[i][1]);
            if(touch){
                touches.push(touch);
            }
        }

        for(let i=0;i<traffic.length;i++){
            const poly=traffic[i].polygon;
            for(let j=0;j<poly.length;j++){
                const touch=getIntersection(ray[0],ray[1],poly[j],poly[(j+1)%poly.length]);
                if(touch){
                    touches.push(touch);
                }
            }
        }

        if(touches.length==0){
            return null;
        }
        else{
            const offsets= touches.map(val=>val.offset);
            const closestIntersection=Math.min(...offsets);
            return  touches.find(val=>val.offset===closestIntersection);
        }
    }

    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const start={x:this.car.x,y:this.car.y};
            const angle=lerp(
            this.raySpread/2,
           -this.raySpread/2,
            (this.rayCount==1)?0.5:i/(this.rayCount-1)
        )+this.car.angle;
            const end={x:this.car.x-Math.sin(angle)*this.rayLength,y:this.car.y-Math.cos(angle)*this.rayLength};
            
            this.rays.push([start,end]);
        }
    }
    draw(ctx){
        for(let i=0;i<this.rays.length;i++){
            let end;
            if(this.readings[i]){
                 end=this.readings[i];
            }
            else{
                 end=this.rays[i][1];
            }
            ctx.beginPath();
            ctx.strokeStyle="yellow";
            ctx.moveTo(this.rays[i][0].x,this.rays[i][0].y);
            ctx.lineTo(end.x,end.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle="black";
            ctx.moveTo(end.x,end.y);
            ctx.lineTo(this.rays[i][1].x,this.rays[i][1].y);
            ctx.stroke();

        }
    }
}