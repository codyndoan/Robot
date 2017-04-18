class Board {
    constructor() {
        // Board Representation 8x8
        this.board = [];
        for (var i = 0; i < 8; i++) this.board.push([0,0,0,0,0,0,0,0]);
        
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.i = 0;
        this.ctx = document.getElementById('grid').getContext('2d');
        this.size = 50;
        this.offset = 5;
        
        /* Visualize grid */
        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
                this.ctx.fillStyle = "rgb(240,240,240)";
                this.ctx.fillRect(col*(this.size+this.offset), row*(this.size+this.offset), this.size, this.size);
            }
        }
    }
    
    /* Update Board Visualization */
    update(xPosition, yPosition) {
        /* Convert to matrix indices */
        var row = 7 - (yPosition - 1);
        var col = xPosition - 1;
        this.board[row][col]++;
        
        /* RGB color cycle */
        var degree = this.red++*13;
        if (degree >= 255) {
            var degree1 = 75 + this.green++*13;
            var degree2 = 100 + this.blue++*10;
            if (degree1 >= 240) degree1 -= 240;
            if (degree2 >= 250) degree2 -= 250;
            this.ctx.fillStyle = "rgb(255," + degree1 + "," + degree2+ ")";
        } else {
            this.ctx.fillStyle = "rgb(" + degree + ",75,100)";
        }
        
        var img = document.getElementById('robot');
        
        this.ctx.fillRect(col*(this.size+this.offset), row*(this.size+this.offset), this.size, this.size);
        this.ctx.drawImage (img, col*(this.size+this.offset), row*(this.size+this.offset), this.size, this.size);
        
    }
    
    toString() {
        var boardString = "";
        for (var i = 0; i < 8; i++) {
            boardString += this.board[i] + '\n';
        }
        return boardString;
    }
    
    reset(originPosition, originDirection) {
        this.red = 0;
        this.blue = 0;
        this.green = 0;
        
        /* Clear board */
        for (var i = 0; i < 8; i++) this.board[i] = [0,0,0,0,0,0,0,0];
        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
                this.ctx.fillStyle = "rgb(240,240,240)";
                this.ctx.fillRect (col*(this.size+this.offset), row*(this.size+this.offset), this.size, this.size);
            }
        }
        
        document.getElementById("location").innerHTML = "Location: " + originPosition;
        document.getElementById("direction").innerHTML = "Direction faced: " + originDirection;
        console.log(this.toString());
    }
}