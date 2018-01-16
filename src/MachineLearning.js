function MachineLearning() {
    this.hillclimb = function(data) {
        // Generate starting position in data
        var pos = chooseRandomPosition(data.length);

        // Loop until we find optima
        var optima = data[pos];        
        
        // Killswitch to prevent us getting stuck in infinite loop
        //  Default is the size of our dataset
        var killswitch = data.length;

        do {
            killswitch--;

            // Get our highest neighbour fitness and position
            neighbourPositions = getNeighbourPositions(pos, data);
            neighbourFitnesses = [
                data[neighbourPositions[0]],
                data[neighbourPositions[1]]
            ];
            
            // Get our fittest neightbour
            var calculate = getBestNeighbour(optima, neighbourFitnesses);

            // If we get false then our optima is reached
            if (calculate === true) {
                break;
            }

            // Set our optima to our new value
            optima = neighbourFitnesses[calculate];

            // Update our position in our data
            //  If calculate has returned 1 we must move up our data else down
            if (calculate == 1) {
                pos++;
            } else {
                pos--;
            }
        } while (killswitch >= 0);

        return optima;
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
