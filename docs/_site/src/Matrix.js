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
            return Math.random() * 2 - 1;
        });
    }

    add(num) {
        if (num instanceof Matrix) {
            this.map(function(data, r, c) {
                return data + num.data[r][c];
            });
        } else {
            this.map(function(data) {
                return data + num;
            });
        }
    }

    static subtract(matrix1, matrix2) {
        var respMatrix = new Matrix(matrix1.rows, matrix1.cols);

        respMatrix.map(function(data, r, c) {
            return matrix1.data[r][c] - matrix2.data[r][c];
        });

        return respMatrix;
    }

    multiply(num) {
        if (num instanceof Matrix) {
            this.map(function(data, r, c) {
                return data * num.data[r][c];
            });
        } else {
            this.map(function(data) {
                return data * num;
            });
        }
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

    static transpose(matrix) {
        var respMatrix = new Matrix(matrix.cols, matrix.rows);

        respMatrix.map(function(data, r, c) {
            return matrix.data[c][r];
        });

        return respMatrix;
    }

    // Global map function to apply function to all data
    map(func) {
        for (var i = 0; i < this.rows; i++) {
            for (var x = 0; x < this.cols; x++) {
                this.data[i][x] = func(this.data[i][x], i, x);
            }
        }
    }

    static map(matrix, func) {
        var respMatrix = new Matrix(matrix.rows, matrix.cols);

        for (var i = 0; i < respMatrix.rows; i++) {
            for (var x = 0; x < respMatrix.cols; x++) {
                respMatrix.data[i][x] = func(matrix.data[i][x], i, x);
            }
        }

        return respMatrix;
    }

    static fromArray(array) {
        var respMatrix = new Matrix(array.length, 1);

        for (var i = 0; i < array.length; i++) {
            respMatrix.data[i][0] = array[i];
        }

        return respMatrix;
    }

    toArray() {
        var respArray = new Array();
        for (var i = 0; i < this.rows; i++) {
            for (var x = 0; x < this.cols; x++) {
                respArray.push(this.data[i][x]);
            }
        }
        return respArray;
    }
}
