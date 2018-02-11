# JS Machine Learning
JS Machine Learning or JSML is a simple JavaScript machine learning toolkit. It's a small little pet project of mine and It's aim is to provide a range of different machine learning techniques which can easily be used either for educational use or real world problems.

[View Demos](https://drroach.github.io/JS-Machine-Learning/)

## Hill Climbing
Hill climbing is a optimization technique used to find optimum values in large datasets. This technique can be applied to problems such as the travelling salesman issue [more here](https://en.wikipedia.org/wiki/Travelling_salesman_problem).

### Usage
```JavaScript
    var ml = new MachineLearning();
    var data = [
        0,
        3,
        4,
        7,
        8,
        12,
        11,
        10,
        8,
        4,
        3,
        1
    ];
    var optima = ml.hillclimbing(data);
```

## Bayes Predictions
Bayes theorem implementation that is used to calculate outputs given a set of inputs. This technique can be applied to making predictions such as choosing the winner of a football match [more here](https://en.wikipedia.org/wiki/Bayes%27_theorem).

### Usage
```JavaScript
    var ml = new MachineLearning();
    // Whether focus team was home or away
    var inputs = [["h", "a", "h", "a", "h", "h", "a", "h", "h", "a"]];
    // Whether focus team won, drew or last corresponding input
    var outputs = ["l", "l", "l", "l", "w", "d", "w", "l", "w", "d"];
    // Out inputs to use to make our prediction
    var next = ["h"];

    var bayes = ml.bayes(inputs, outputs, next);
```

#### Known Issue
The current bayes implementation only allows one input dimension. This is known and in the process of being fixed.

## Neural Network
Neural networks can be trained to think by itself and spot patterns that we as humans may not be able to see.

### Usage
```JavaScript
    // Create network with 2 input nodes, 2 hidden nodes and one output node
    var nn = new NeuralNetwork(2, 2, 1);
    // Our training data. We have 2 inputs and 1 output
    var nnTraining = 
    [{
        inputs: [0,0],
        targets: [0]
    }, 
    {
        inputs: [1,0],
        targets: [1]
    },
    {
        inputs: [0,1],
        targets: [1]
    },
    {
        inputs: [1,1],
        targets: [0]
    }];
    // Train our neural network
    for (var i = 0; i < 100000; i++) {
        var rand = Math.floor(Math.random() * 4);
        var data = nnTraining[rand];
        nn.train(data.inputs, data.targets);
    }
    // Make our guess
    var guess = nn.feedforward([0, 1]);
    console.log(guess);
```

## Currently Working On
- Fixing TSP implementation to give more accurate results
- Change Bayes implementation to allow for more than one set of input data
- Allowing more than one hidden neuron layer
- Simulated Annealing tool
- k-NearestNeighbour tool
- Evolutionary Algorithms
