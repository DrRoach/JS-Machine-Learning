class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        // Generate input weights
        this.inputWeights = new Matrix(this.hiddenNodes, this.inputNodes);
        
        // Generate hidden weights
        this.hiddenWeights = new Matrix(this.outputNodes, this.hiddenNodes);

        // Populate starting weights
        this.inputWeights.randomize();
        this.hiddenWeights.randomize();

        // Bias matrix
        this.bias_hidden = new Matrix(this.hiddenNodes, 1);
        this.bias_output = new Matrix(this.outputNodes, 1);
    }

    feedforward(input) {
        //var hiddenValues = Matrix.multiply(this.inputWeights, input);
        //hiddenValues.add(this.bias_hidden);

        //hiddenValues.print();
    }
}
