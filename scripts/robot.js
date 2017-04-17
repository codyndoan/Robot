class Board {
    constructor() {
        // Board Representation 8x8
        this.board = [];
        for (var i = 0; i < 8; i++) this.board.push([0,0,0,0,0,0,0,0]);
        
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.ctx = document.getElementById('grid').getContext('2d');
        this.size = 50;
        this.offset = 5;
        
        /* Visualize grid */
        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
                this.ctx.fillStyle = "rgb(200,200,200)";
                this.ctx.fillRect(col*(this.size+this.offset), row*(this.size+this.offset), this.size, this.size);
            }
        }
    }
    
    update(xPosition, yPosition, lastx, lasty) {
        /* Convert to matrix indices */
        var row = 7 - (yPosition - 1);
        var col = xPosition - 1;
        this.board[row][col]++;
        
        var degree = this.red++*35;
    
        if (degree >= 240) {
            var degree1 = this.green++*15;
            var degree2 = this.blue++*5;
            if (degree1 >= 100) degree1 = 100;
            if (degree2 >= 140) degree2 = 140;
            this.ctx.fillStyle = "rgb(240," + degree1 + "," + degree2+ ")";
        } else {
            this.ctx.fillStyle = "rgb(" + degree + ",0,0)";
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
                this.ctx.fillStyle = "rgb(200,200,200)";
                this.ctx.fillRect (col*(this.size+this.offset), row*(this.size+this.offset), this.size, this.size);
            }
        }
        
        document.getElementById("location").innerHTML = "Location: " + originPosition;
        document.getElementById("direction").innerHTML = "Direction faced: " + originDirection;
        console.log(this.toString());
    }
}

class Robot {
    
    /* Game Constructor */
    constructor(x, y, direction, actions, board) {
        // Current Coordinate of Robot
        this.xPosition = x;
        this.yPosition = y;
        this.originPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        this.currentPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        
        // Current Direction of Robot
        this.originDirection = direction;
        this.currentDirection = direction;
        
        // Current Action path of Robot
        this.actions = actions;
        
        /* Setup map, mapping direction to index */
        this.directions = ['N', 'E', 'S', 'W'];
        this.dir_map = {'N': 0, 'E': 1, 'S': 2, 'W': 3};
        
        this.board = board;
        
        this.speed = 100;
    }
    
    /* Set Robot's starting position */
    setPosition(fromInput) {
        if (fromInput) {
            var positionInput = document.getElementById("origin-input").value;
            positionInput = positionInput.replace(/[^1-8]+/g, "");
            this.xPosition = positionInput[0];
            this.yPosition = positionInput[1];
            if (this.xPosition === undefined || !this.xPosition) this.xPosition = "x";
            if (this.yPosition === undefined || !this.yPosition) this.yPosition = "y";
            this.originPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        }
        
        this.currentPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        
        document.getElementById("location").innerHTML = "Location: " + this.currentPosition;
        
        /* Update position on board */
        if (!fromInput)  this.board.update(this.xPosition, this.yPosition);
            
    }
    
    /* Set Robot's action path M, R, L*/
    setAction() {
        /* Error Checking */
        var actionInput = document.getElementById("action-input").value;
        /* Remove all invalid characters from action string */
        actionInput = actionInput.replace(/[^mlrMLR]+/g, "");
        actionInput = actionInput.toUpperCase();
        this.actions = actionInput;
    }
    
    /* Set Robot's direction */
    setDirection(direction, fromInput) {
        /* Error Checking */
        if (direction != 'N' && direction != 'E' && direction != 'S' && direction != 'W' && direction != '') return;
        
        /* Setting from input */
        this.originDirection = document.getElementById("direction-input").value;
        if (fromInput) this.currentDirection = this.originDirection;
        else this.currentDirection = direction;
        document.getElementById("direction").innerHTML = "Direction faced: " + this.currentDirection;
    }
    
    begin(resetOnly) {
        /* Reset board */
        this.board.reset(this.originPosition, this.originDirection);
        if (resetOnly) return;
        
        this.setPosition(true);
        this.setDirection(this.originDirection, true);
        
        /* Only move robot once, x and y have been set */
        if (this.xPosition != "x" && this.yPosition != "y" ) {
            this.board.update(this.xPosition, this.yPosition);
            this.performActions(this.actions);
            console.log(this.board.toString());
            console.log(document.getElementById("location").innerHTML);
            console.log(document.getElementById("direction").innerHTML);
        }
    }
    
    performActions(actions) {
        /* Let robot follow action path */
        for (var i = 0; i < this.actions.length; i++) {
            setTimeout(function(actions, i) {
                var action = actions.charAt(i).toUpperCase();
                if (action == 'M') this.move();
                if (action == 'L') this.turn(this.currentDirection, action);
                if (action == 'R') this.turn(this.currentDirection, action);
            }.bind(this), this.speed*i, actions, i);
        }
    }
    
    /* Move one forward */
    move() {
        /* Determine next position from moving forward in current direction */
        switch(this.currentDirection) {
          case 'N':
            /* If facing North, increment y position & bound check*/
            if ( ++this.yPosition > 8) this.yPosition--;
            break;
                
          case 'E':
            /* If facing East, increment x position & bound check*/
            if ( ++this.xPosition > 8) this.xPosition--;
            break;

          case 'S':
            /* If facing South, decrement y position & bound check*/
            if ( --this.yPosition < 1) this.yPosition++;
            break;

          case 'W':
            /* If facing West, decrement x position & bound check*/
            if ( --this.xPosition < 1) this.xPosition++;
            break;

          default:
            break;
        }
        /* set Robot's position */
        this.setPosition(false);
    }

    /* turn left or right */
    turn(direction, turn) {
        /* Get enumeration for current direction*/
        var current = this.dir_map[direction];

        /* Get index of next direction based on turn and make bound check resolutions if needed*/
        if (turn == 'L') {
            if (--current < 0) current += this.directions.length;
        } else {
            if (++current >= this.directions.length) current %= this.directions.length;
        }

        /* Set new direction faced */
        this.setDirection(this.directions[current], false);
    }
    
}

var myBoard = new Board();
var myRobot = new Robot("x", "y", "", "", myBoard);