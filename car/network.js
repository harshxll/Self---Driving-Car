class NeuralNetwork {
    constructor(neuronCount) {
        this.levels = [];
        for (let i = 0; i < neuronCount.length - 1; i++) {
            this.levels.push(
                new Level(neuronCount[i], neuronCount[i + 1])
            );
        }
    }

    static feedForward(inputArray, network) {
        let output = Level.forwardFeed(inputArray, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            output = Level.forwardFeed(output, network.levels[i]);
        }
        return output;
    }

    static mutate(network,amount=1){
        network.levels.forEach((level)=>{
            for(let i=0;i<level.input.length;i++){
                for(let j=0;j<level.output.length;j++){
                    level.weight[i][j]=lerp(
                        level.weight[i][j],
                        Math.random()*2-1,
                        amount
                    )
                }
            }

            for(let i=0;i<level.biases;i++){
                level.biases[i]=lerp(
                    level.biases[i],
                    Math.random()*2-1,
                    amount
                )
            }
        })
    }
}

class Level {
    constructor(inputCount, outputCount) {
        this.input = new Array(inputCount);
        this.output = new Array(outputCount);
        this.biases = new Array(outputCount);
        this.weight = new Array(inputCount).fill(0).map(() => new Array(outputCount));

        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i = 0; i < level.input.length; i++) {
            for (let j = 0; j < level.output.length; j++) {
                level.weight[i][j] = 2 * Math.random() - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = 2 * Math.random() - 1;
        }
    }

    static forwardFeed(givenInput, level) {
        for (let i = 0; i < givenInput.length; i++) {
            level.input[i] = givenInput[i];
        }
        for (let i = 0; i < level.output.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.input.length; j++) {
                sum += level.input[j] * level.weight[j][i];
            }
            level.output[i] = sum > level.biases[i] ? 1 : 0;
        }
        return level.output;
    }
}