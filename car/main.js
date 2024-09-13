const canvas=document.getElementById("myCanvas");//Building Canvas

const ctx=canvas.getContext('2d');//Getting Tools

//Defining Canvas
canvas.width=300;

//Building Road
const road=new Road(canvas.width/2,canvas.width*0.9); 

//Building Cars
function generateCars(N){
    const cars=[]
    for(let i=0;i<N;i++){
     cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

const N=500;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("BestBrain")){
    for(let i=0;i<cars.length;i++){
     cars[i].brain=JSON.parse(localStorage.getItem("BestBrain"));
     if(i!=0)NeuralNetwork.mutate(cars[i].brain,1);
    }
}
//Traffic
const traffic=[
    new Car(road.getLaneCenter(1),10,30,50,"DUMMY"),
    new Car(road.getLaneCenter(2),-200,30,50,"DUMMY"),
    new Car(road.getLaneCenter(1),-150,30,50,"DUMMY"),
    new Car(road.getLaneCenter(4),-100,30,50,"DUMMY"),
    new Car(road.getLaneCenter(2),-600,30,50,"DUMMY"),
    new Car(road.getLaneCenter(1),-400,30,50,"DUMMY"),
    new Car(road.getLaneCenter(0),20,30,50,"DUMMY"),
    new Car(road.getLaneCenter(1),22,30,50,"DUMMY"),
]


function animate(){
    canvas.height=window.innerHeight;
    bestCar=cars.find(c=>c.y===Math.min(
        ...cars.map(c=>c.y)
    ))
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    ctx.save();
    ctx.translate(0,-bestCar.y+canvas.height*0.5);
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    road.draw(ctx);

    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,"blue");
    }
    ctx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(ctx,"red");
    }
    ctx.globalAlpha=1;
    bestCar.draw(ctx,"red",true);
    ctx.restore();
    requestAnimationFrame(animate);
}

animate()

//Save
function save(){
    localStorage.setItem("BestBrain",JSON.stringify(bestCar.brain));
}
