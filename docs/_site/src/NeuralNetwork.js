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

        this.bias_hidden.randomize();
        this.bias_output.randomize();

        this.learningRate = 0.1;
    }

    feedforward(input) {
        var inputs = Matrix.fromArray(input);

        this.hiddenValues = Matrix.multiply(this.inputWeights, inputs);
        this.hiddenValues.add(this.bias_hidden);

        // Activation function
        this.hiddenValues.map(this.sigmoid);

        this.outputValues = Matrix.multiply(this.hiddenWeights, this.hiddenValues);
        this.outputValues.add(this.bias_output);

        this.outputValues.map(this.sigmoid);

        return this.outputValues.toArray();
    }

    train(inputs, targets) {
        var outputs = this.feedforward(inputs);
        targets = Matrix.fromArray(targets);

        var outputErrors = Matrix.subtract(targets, this.outputValues);

        // Calculate gradient
        var gradients = Matrix.map(this.outputValues, this.dSigmoid);

        gradients.multiply(outputErrors);
        gradients.multiply(this.learningRate);

        var hiddenValuesT = Matrix.transpose(this.hiddenValues);
        var hiddenWeightsDeltas = Matrix.multiply(gradients, hiddenValuesT);

        this.hiddenWeights.add(hiddenWeightsDeltas);
        this.bias_output.add(gradients);

        var hiddenWeightsT = Matrix.transpose(this.hiddenWeights);
        var hiddenErrors = Matrix.multiply(hiddenWeightsT, outputErrors);

        // Calculate hidden gradient
        var hiddenGradient = Matrix.map(this.hiddenValues, this.dSigmoid);

        hiddenGradient.multiply(hiddenErrors);
        hiddenGradient.multiply(this.learningRate);

        var inputsT = Matrix.transpose(Matrix.fromArray(inputs));
        var hiddenDeltas = Matrix.multiply(hiddenGradient, inputsT);

        this.inputWeights.add(hiddenDeltas);
        this.bias_hidden.add(hiddenGradient);
    }

    sigmoid(n) {
        return 1 / (1 + Math.exp(-n));
    }

    dSigmoid(n) {
        return n * (1 - n);
    }
}
