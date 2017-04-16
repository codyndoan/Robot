class boardGame {
    
    /* Game Constructor */
    constructor(xCoordinate, yCoordinate, direction, actions) {
        if (arguments.length != 4) {
            this.x = 1;
            this.y = 1;
            this.currentDirection = 'N';
            this.actions = '';
        } else {
            this.x = xCoordinate;
            this.y = yCoordinate;
            this.currentDirection = direction;
            this.actions = actions;   
        }
    }
    
    /* Set Robot's starting position */
    setOrigin() {
        var input, origin;
        input = document.getElementById("origin-input");
        origin = input.value;
        document.getElementById("location").innerHTML = "Location: " + orgin;
        console.log(origin);
    }
    
    /* Set Robot's action path M, R, L*/
    setAction() {
        /* Error Checking */
        var actionInput = document.getElementById("action-input").value;
        actionInput = actionInput.replace(/[^MLR]+/g, "");
        this.actions = actionInput;
    }
    
    /* Set Robot's direction */
    setDirection(direction, fromInput) {
        /* Setting from input */
        if (fromInput) var direction = document.getElementById("direction-input").value.toUpperCase();
        /* Error Checking */
        if (direction != 'N' && direction != 'E' && direction != 'S' && direction != 'W' && direction != '') return;
        
        this.currentDirection = direction;
        document.getElementById("direction").innerHTML = "Direction faced: " + direction;
    }
    
    begin() {
        
    }
}

var myBoard = new boardGame();