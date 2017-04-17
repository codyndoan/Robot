
class Robot {
    
    /* Robot Constructor */
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
        
        this.speed = 0;
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
                if (i == actions.length - 1) {
                    console.log(this.board.toString());
                    console.log(document.getElementById("location").innerHTML);
                    console.log(document.getElementById("direction").innerHTML);
                }
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
    
    changeSpeed() {
        this.speed = document.getElementById('slider').value;
        document.getElementById('speed-text').innerHTML = "Animation Speed: " + this.speed + " ms";
    }
    
}