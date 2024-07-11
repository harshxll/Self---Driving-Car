class Car{
    constructor(x,y,width,height,controlType){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=0;
        this.accleration=0.2;
        this.maxSpeed=(controlType==="DUMMY")?3:6;
        this.friction=0.05;
        this.angle=0;
        this.controls=new Control(controlType);
        this.useBrain=controlType==="AI";
        if(controlType!="DUMMY"){
            this.sensor=new Sensor(this);
            this.brain=new NeuralNetwork([this.sensor.rayCount,6,4]);
        }
        this.damage=false;
        this.polygon=[];
        this.controlType=controlType;
    }

    update(roadBorders,traffic){
        this.#move();
        this.#createPolygon();
        this.damage=(!this.damage)?this.#assessDamage(roadBorders,traffic):true;
        if(this.sensor){
            this.sensor.update(roadBorders,traffic)
            const offset=this.sensor.readings.map(
                s=>s===null?0:1-s.offset
            )
            const output=NeuralNetwork.feedForward(offset,this.brain);
            console.log(output);
            if(this.useBrain){
                this.controls.forward=output[0];
                this.controls.left=output[1];
                this.controls.right=output[2];
                this.controls.backward=output[3];
            }
        }
    }
    #assessDamage(roadBorders,traffic){
        for(let i=0;i<roadBorders.length;i++){
            if(polygonIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        if(this.controlType!="DUMMY"){
            for(let i=0;i<traffic.length;i++){
                if(polygonIntersect(this.polygon,traffic[i].polygon)){
                    return true;
                }
            }
        }
        return false;
    }
    #createPolygon(){
        const points=[]
        const radius=Math.hypot(this.width/2,this.height/2);
        const alpha=Math.atan2(this.width,this.height);
        points.push(
            {
                x:this.x-Math.sin(this.angle-alpha)*radius,y:this.y-Math.cos(this.angle-alpha)*radius
            }
        )
        points.push(
            {
                x:this.x-Math.sin(this.angle+alpha)*radius,y:this.y-Math.cos(this.angle+alpha)*radius
            }
        )
        points.push(
            {
                x:this.x-Math.sin(Math.PI+this.angle-alpha)*radius,y:this.y-Math.cos(Math.PI+this.angle-alpha)*radius
            }
        )
        points.push(
            {
                x:this.x-Math.sin(Math.PI+this.angle+alpha)*radius,y:this.y-Math.cos(Math.PI+this.angle+alpha)*radius
            }
        )
        this.polygon=points;
    }
    #move(){
        if(!this.damage){
            if(this.controls.forward) this.speed+=this.accleration;
            if(this.controls.backward) this.speed-=this.accleration;
            if(this.speed!=0){
                let flip=(this.speed>0)?1:-1;
                if(this.controls.left) this.angle+=0.03*flip;
                if(this.controls.right) this.angle-=0.03*flip;
            }
            
    
            if(Math.abs(this.speed)<this.friction)this.speed=0;
    
            if(this.speed>this.maxSpeed) this.speed=this.maxSpeed;
            if(this.speed<-this.maxSpeed/2) this.speed=-this.maxSpeed/2;
            if(this.speed>0)this.speed-=this.friction;
            if(this.speed<0)this.speed+=this.friction;
    
            this.y-=Math.cos(this.angle)*this.speed;
            this.x-=Math.sin(this.angle)*this.speed;
        }   
    }
    draw(ctx,color="blue",drawSensor=false){
       // Drawing the block
       if(this.damage){
            ctx.fillStyle="gray";
       }
       else{
            ctx.fillStyle=color;
       }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=0;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[(i+1)%this.polygon.length].x,this.polygon[(i+1)%this.polygon.length].y);
        }
        ctx.fill();
       if(this.sensor&&drawSensor) this.sensor.draw(ctx);
    }
}