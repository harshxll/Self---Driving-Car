class Control{
    constructor(controlType){
        this.forward=false;
        this.backward=false;
        this.left=false;
        this.right=false;
        if(controlType==="KEYS"){
            this.#addKeyboardListners();
        }
        if(controlType==="DUMMY"){
            this.forward=true;
        }
    }

    #addKeyboardListners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowUp" : 
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.backward=true;
                    break;
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
            }
            // console.table(this);
        }
        //Used Arrow Function because in other function this keyword refers to the Function
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowUp" : 
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.backward=false;
                    break;
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
            }
            console.table(this);
        }
    }
}