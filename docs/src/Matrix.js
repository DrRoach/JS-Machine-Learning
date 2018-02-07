class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        // Create our new matrix and set all of our values to 0

        // Create our matrix
        this.data = new Array(this.rows);

        // Populate each row with our columns array
        for (var x = 0; x < this.rows; x++) {
            this.data[x] = new Array(this.cols);

            for (var i = 0; i < this.cols; i++) {
                this.data[x][i] = 0;
            }
        }
    }

    print() {
        console.table(this.data);
    }

    randomize() {
        this.map(function() {
            return Math.floor(Math.random() * 10);
        });
    }

    add(num) {
        this.map(function(data) {
            return data + num;
        });
    }

    multiply(num) {
        this.map(function multiply(data) {
            return data * num;
        });
    }

    static multiply(matrix1, matrix2) {
        var resMatrix = new Matrix(matrix1.rows, matrix2.cols);

        resMatrix.map(function(data, x, y) {
            var sum = 0;

            for (var i = 0; i < matrix1.cols; i++) {
                sum += matrix1.data[x][i] * matrix2.data[i][y];
            }

            return sum;
        });

        return resMatrix;
    }

    // Global map function to apply function to all data
    map(func) {
        for (var i = 0; i < this.rows; i++) {
            for (var x = 0; x < this.cols; x++) {
                this.data[i][x] = func(this.data[i][x], i, x);
            }
        }
    }
}
