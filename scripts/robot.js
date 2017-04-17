
class Robot {
    
    /* Robot Constructor 
     * Description:
     *  Initializes robot's current position/direction, original position/direction and
     *  action string. Initializes directions array and map. Initializes board and animation speed.
     *  
     */
    constructor(x, y, direction, actions, board) {
        // Current Coordinate of Robot
        this.xPosition = x;                                 // int
        this.yPosition = y;                                 // int
        this.originPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        this.currentPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        
        // Current Direction of Robot
        this.originDirection = direction;                   // char
        this.currentDirection = direction;                  // char
        
        // Current Action path of Robot
        this.actions = actions;                             // string
        
        
        this.directions = ['N', 'E', 'S', 'W'];
        
        // Setup map, mapping index to direction, to be used in turn function */
        this.dir_map = {'N': 0, 'E': 1, 'S': 2, 'W': 3};
        
        this.board = board;                                 // Board object
        
        this.speed = 0;
    }
    
    /* Function: setPosition
     * Description:
     *  Set's robots current position in the string form [x, y]. Accepts all strings, but only recognizes
     *  the first two numeric characters from [1, 8]. These two numbers represent robot's current
     *  position. If called from input, keep original position. Else it has been called from move(),
     *  indicating only current position must be updated.
     * Parameters:
     *  fromInput - a boolean indicating if called from input change.
     */
    setPosition(fromInput) {
        /* Check if called from input change */
        if (fromInput) {
            var positionInput = document.getElementById("origin-input").value;
            /* Keep only characters [1,8] from string */
            positionInput = positionInput.replace(/[^1-8]+/g, "");
            /* Make first two characters as the robot's current position */
            this.xPosition = positionInput[0];
            this.yPosition = positionInput[1];
            /* If not specified, default to 'x' or 'y' */
            if (this.xPosition === undefined || !this.xPosition) this.xPosition = "x";
            if (this.yPosition === undefined || !this.yPosition) this.yPosition = "y";
            this.originPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        }
        
        this.currentPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        
        document.getElementById("location").innerHTML = "Location: " + this.currentPosition;
        
        /* Update position on board */
        if (!fromInput)  this.board.update(this.xPosition, this.yPosition);
            
    }
    
    /* Function: setAction
     * Description:
     *  Set's robots action path. Accepts all strings, but only recognizes valid input by taking
     *  only subtrings of the form {m,l,r,M,L,R}* which can be noncontiguous in original string.
     *  Makes string friendly in order to be used in performActions() function.
     */
    setAction() {
        /* Error Checking */
        var actionInput = document.getElementById("action-input").value;
        /* Remove all invalid characters from action string and set case */
        actionInput = actionInput.replace(/[^mlrMLR]+/g, "");
        actionInput = actionInput.toUpperCase();
        this.actions = actionInput;
    }
    
    /* Function: setDirection
     * Description:
     *  Set's robots current direction. If called from input, keep original direction. 
     *  Else it has been called from turn(), indicating that only current direction should be set. 
     *  Perform's input validation by only accepting N, E, S, W, or empty.
     * Parameters:
     *  direction - a character specifying direction to set current robot's direction to
     *  fromInput - a boolean specifying if called from input change
     */
    setDirection(direction, fromInput) {
        /* Error Checking */
        if (direction != 'N' && direction != 'E' && direction != 'S' && direction != 'W' && direction != '') return;
        
        /* Setting from input */
        if (fromInput)  {
            this.originDirection = direction;
            this.currentDirection = this.originDirection;
        } else this.currentDirection = direction;

        /* Update page */
        document.getElementById("direction").innerHTML = "Direction faced: " + this.currentDirection;
    }
    
    /* Function: begin
     * Description:
     *  Begin's Robot Board game. Resets board initially. Delegates to setPosition
     *  and setDirection for form input cleaning. Then performs validatiton and delegates
     *  to performActions if input is valid.
     * Parameters:
     *  resetOnly - a boolean that specifies if calling from reset button
     * Error Handling:
     *  Alerts user when inital position is incorrectly specified
     */
    begin(resetOnly) {
        /* Reset board */
        this.board.reset(this.originPosition, this.originDirection);
        if (resetOnly) return;
        
        this.setPosition(true);
        this.setDirection(this.originDirection, true);
        document.getElementById('origin-input').value = this.originPosition;
        
        /* Only move robot once, x and y have been set */
        if (this.xPosition != "x" && this.yPosition != "y" ) {
            this.board.update(this.xPosition, this.yPosition);
            this.performActions(this.actions, this.currentDirection);
        } else {
            alert("Please enter a position in the form [x, y], where 0 < x,y < 9");
        }
    }
    
    /* Function: performActions
     * Description: 
     *  Iterates through robot's action input in the form of {M,L,R}*
     *  If current action is 'M', delgate to move() function. Else if specifying
     *  'R' or 'L', delegate to the turn function. 
     * Parameters:
     *  actions - a string specifing action path for robot in form {M,L,R}*
     *  direction - a character specifing current direction of robot ('N','S','E', or 'W')
     * Error Handling:
     *  Alerts user when initial direction is not specified.
     */
    performActions(actions, direction) {
        /* Let robot follow action path */
        if (direction.length == 0) {
            alert("Direction has not been specified. Please enter either N, S, W, or E");
        } else {
            for (var i = 0; i < actions.length; i++) {
                setTimeout(function(actions, i) {
                    var action = actions.charAt(i);
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
    }
    
    /* Function: move
     * Description: 
     *  Simulates robot moving forward once from its current facing direction.
     *  Makes bound checks if robot attempts to move beyond range [1,8]
     *  Delegates to setPosition to change robot's position and update board.
     * Error Handling
     *  Makes boundary checks
     */
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

    /* Function: turn
     * Description: 
     *  Simulates robot turning left or right from its current facing direction.
     *  Delegate's to setDirection to set robot's new direction based on turn ('L' or 'R')
     * Parameters
     *  direction - a character specifying robot's current direction ('N','S','E', or 'W')
     *  turn - a character specifying which direction to turn ('L' or 'R')
     */
    turn(direction, turn) {
        /* Get index for current direction*/
        var current = this.dir_map[direction];
    
        /* Get index of next direction in directions array based on turn and make bound check resolutions if needed */
        if (turn == 'L') {
            if (--current < 0) current += this.directions.length;
        } else {
            if (++current >= this.directions.length) current %= this.directions.length;
        }

        /* Set new direction faced */
        this.setDirection(this.directions[current], false);
    }
    
    /* Function: changeSpeed
     * Description: 
     *  Update robot's speed based on slider element's current value.
     *  Update corresponding page label. Called from onchange event.
     */
    changeSpeed() {
        this.speed = document.getElementById('slider').value;
        document.getElementById('speed-text').innerHTML = "Animation Speed: " + this.speed + " ms";
    }
    
}