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
### Currently Working On
- Adding minimization alongside maximumization

## In Development
- Simulated Annealing tool
- k-NearestNeighbour tool
- Evolutionary Algorithms
