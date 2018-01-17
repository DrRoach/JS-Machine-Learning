

function MachineLearning() {
    this.OUTPUT_ARRAY = 1;
    this.OUTPUT_SINGLE = 2;

    this.INPUT_LINEAR = 3;
    this.INPUT_XY = 4;

    this.hillclimb = function(data, input = this.INPUT_LINEAR,  output = this.OUTPUT_SINGLE) {
        var pos = 0;

        // Generate starting position in data
        if (output == this.OUTPUT_ARRAY) {
            // Generate an array of our optima
            var pos = chooseRandomArrayInput(data);
            var optima = measureDistance(pos, data, input);
        } else {
            var pos = chooseRandomPosition(data.length);
            // Loop until we find optima
            var optima = data[pos];
        }

        // Killswitch to prevent us getting stuck in infinite loop
        var killswitch = 100000;

        do {
            killswitch--;

            // Make sure that our neighbour positions are available
            var neighbourPositions;

            // Make sure that we set our neighbour positions correctly
            if (output == this.OUTPUT_ARRAY) {

                // Generate our neighbours as array inputs
                neighbourPositions = getNeighbourArrayPositions(pos, data);

                // Calculate our fitnesses for our neighbours
                var neighbourFitnesses = [
                    measureDistance(neighbourPositions[0], data, input),
                    measureDistance(neighbourPositions[1], data, input)
                ];
            } else {
                // Get our highest neighbour fitness and position
                neighbourPositions = getNeighbourPositions(pos, data);
                var neighbourFitnesses = [
                    data[neighbourPositions[0]],
                    data[neighbourPositions[1]]
                ];
            }
            
            // Get our fittest neightbour
            var calculate = getBestNeighbour(optima, neighbourFitnesses);

            // If we get false then our optima is reached
            if (calculate === true) {
                break;
            }

            // Set our optima to our new value
            optima = neighbourFitnesses[calculate];

            // Update our position in our data
            //  If calculate has returned 1 our neighbour at position[1] is the
            //  best neighbour else it's position[0]
            if (calculate == 1) {
                pos = neighbourPositions[1];
            } else {
                pos = neighbourPositions[0];
            }
        } while (killswitch >= 0);

        return {
            "optima": optima,
            "pos": pos
        };
    }

    var measureDistance = function(pos, data, input) {
        // Get the distance between each of our outputs
        var distance = 0;

        for (var i = 0; i < pos.length; i++) {
            if (input == 3) {
                var next = pos[i + 1];

                if (next > (pos.length - 1)) {
                    next = 0;
                } else if (typeof next == "undefined") {
                    next = pos[0];
                }
                distance += data[pos[i]][next];
            } else if (input == 4) {
                var next = i + 1;
                if (next >= pos.length) {
                    next = 0;
                }

                // Work out our x and y differences
                var xDiff = data[pos[i]][0] - data[pos[next]][0];
                if (xDiff < 0) {
                    xDiff = xDiff * -1;
                }

                var yDiff = data[pos[i]][1] - data[pos[next]][1];
                if (yDiff < 0) {
                    yDiff = yDiff * -1;
                }

                distance += xDiff + yDiff;
            }
        }

        return distance;
    }

    var chooseRandomArrayInput = function(data) {
        var pos = chooseRandomPosition(data.length);
        
        // Set our response array length
        var resp = [data.length];

        // Loop through our data inputs
        for (var i = 0; i < data.length; i++) {

            // Check to see if is position already exists
            while (resp.includes(pos)) {
                // If we are at the end of our data input loop to the start
                if (pos == (data.length - 1)) {
                    pos = 0;
                } else {
                    pos++;
                }
            }

            // Add the position to our response
            resp[i] = pos;

            // Generate next position
            pos = chooseRandomPosition(data.length);
        }

        return resp;
    }
    
    /**
     * Return array of the two next neighbours in our data
     * 
     * The positions of  our neighbours are returned. If our current position is 0
     *  then return[0] will also be 0 as we assume that's the smallest position in our
     *  data. If pos == (data.length - 1) then return[1] will be set to our last position
     *  in our data array
     */
    var getNeighbourPositions = function (pos, data) {
        // Make sure we keep within our array constraints
        var downNeighbour = ((pos > 0) ? (pos - 1) : 0);
        var upNeighbour   = ((pos < (data.length - 1)) ? (pos + 1) : (data.length - 1));

        return [
            downNeighbour,
            upNeighbour
        ];
    }

    /**
     * Get our two closest neighbours to array input
     *
     * Using our array input, say {2,4,3,1,0}, if we are switching on position 2 then we
     *  must generate the two following closest neighbours: {2,3,4,1,0} and {2,4,1,3,0}.
     */
    var getNeighbourArrayPositions = function(pos, data) {
        // Generate random switch position
        var switchPos = chooseRandomPosition(data.length);
        switchPos = pos.length - 1;

        // Create our two neighbour arrays
        var downNeighbour = [pos.length];
        var upNeighbour = [pos.length];

        // Make sure that we build our next neighbour arrays correctly
        for (var i = 0; i < pos.length; i++) {
            switch (i) {
                case (switchPos - 1):
                    downNeighbour[i] = pos[i + 1];
                    upNeighbour[i] = pos[i];
                    break;
                case switchPos:
                    var wrapPos = i;
                    if (switchPos == (pos.length - 1)) {
                        wrapPos = -1;
                        upNeighbour[0] = pos[i];
                    }
                    upNeighbour[i] = pos[wrapPos + 1];

                    wrapPos = i;
                    if (switchPos == 0) {
                        wrapPos = pos.length;
                    }
                    downNeighbour[i] = pos[wrapPos - 1];
                    break;
                case (switchPos + 1):
                    upNeighbour[i] = pos[i - 1];
                    downNeighbour[i] = pos[i];
                    break;
                default:
                    var wrapPos = i;
                    if (switchPos == 0 && i == (pos.length - 1)) {
                        wrapPos = 0;
                    }
                    downNeighbour[i] = pos[wrapPos];
                    upNeighbour[i] = pos[i];
            }
        }

        return [
            downNeighbour,
            upNeighbour
        ];
    }

    /**
     * Compare our optima and two closest neighbour values
     *
     * First we select which one of our two neighbours is fittest and store it's position
     *  and then we compare our optima with this value. If the optima is larger than our 
     *  best neighbour then we return true. If not then we have found our new optima and
     *  return it's position in the neighbours array
     *   
     */
    var getBestNeighbour = function(optima, neighbours) {
        // Compare our two neighbours
        var fittestNeighbour = null;
        if (neighbours[0] > neighbours[1]) {
            fittestNeighbour = 0;
        } else {
            fittestNeighbour = 1;
        }

        // Compare our fittest neighbour and optima
        if (optima > neighbours[fittestNeighbour]) {
            // We have reached our optima
            return true;
        } else {
            return fittestNeighbour;
        }
    }

    /**
     * Generate random position between 0 and `max`
     *  We can start at 0 as we can always expect our array inputs to be 0-n
     */
    var chooseRandomPosition = function(max) {
        return Math.floor(Math.random() * max);
    }
}
