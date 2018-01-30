# JSMachineLearner
JSMachineLearner or JSML is a simple JavaScript machine learning toolkit. It's aim is to provide a range of different machine learning techniques which can easily be used either for educational use or real world problems.

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

### Currently Working On
- Fixing TSP implementation to give more accurate results
- Change Bayes implementation to allow for more than one set of input data

## In Development
- Simulated Annealing tool
- k-NearestNeighbour tool
- Evolutionary Algorithms
