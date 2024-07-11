class Graph{
    constructor(points=[],segments=[]){
        this.points=points;
        this.segments=segments;
    }

    //Points
    addPoint(point){
        this.points.push(point);
    }

    tryAddPoint(point){
        if(this.cotainsPoint(point)) return false;
        this.addPoint(point);
        return true;
    }
    cotainsPoint(point){
        return this.points.find((p)=>p.equal(point));
    }
    removePoint(point){
        const segs=this.segmentWithPoint(point);
        for(let seg of segs){
            this.removeSegment(seg);
        }
        this.points=this.points.filter((p)=>!p.equal(point));
    }


    //Segment
    segmentWithPoint(point){
        const segs=this.segments.filter(s=>s.includes(point));
        return segs;
    }
    containsSegment(seg){
        return this.segments.find((s)=>s.equal(seg));
    }
    tryAddSegment(seg){
        if(!this.containsSegment(seg)&&!seg.start.equal(seg.end)){
            this.segments.push(seg);
            return true;
        }
        return false;
    }
    addSegment(seg){
        this.segments.push(seg);
    }
    removeSegment(seg){
        this.segments=this.segments.filter((s)=>!s.equal(seg));
    }


    //General
    dispose(){
        this.segments.length=0;
        this.points.length=0;
    }
    draw(ctx){
        for(let i=0;i<this.points.length;i++){
            this.points[i].draw(ctx);
        }
        for(let segment of this.segments){
            segment.draw(ctx);
        }
    }
}