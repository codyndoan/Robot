class boardGame {
    
    /* Game Constructor */
    constructor(x, y, direction, actions) {

        this.board = [];
        for (var i = 0; i < 8; i++) this.board.push([0,0,0,0,0,0,0,0]);
    
        this.xPosition = x;
        this.yPosition = y;
        this.currentPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        this.currentDirection = direction;
        this.actions = actions;   
        
        /* Setup Hashmap, mapping direction to index */
        this.directions = ['N', 'E', 'S', 'W'];
        this.dir_map = new Map();
        this.dir_map.set('N', 0);
        this.dir_map.set('E', 1);
        this.dir_map.set('S', 2);
        this.dir_map.set('W', 3);
    }
    
    /* Set Robot's starting position */
    setOrigin() {
        var originInput = document.getElementById("origin-input").value;
        originInput = originInput.replace(/[^1-8]+/g, "");
        this.xPosition = originInput[0];
        this.yPosition = originInput[1];
        if (this.xPosition === undefined) this.xPosition = "not valid";
        if (this.yPosition === undefined) this.yPosition = "not valid";
        this.currentPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        document.getElementById("location").innerHTML = "Location: " + this.currentPosition;
    }
    
    /* Set Robot's action path M, R, L*/
    setAction() {
        /* Error Checking */
        var actionInput = document.getElementById("action-input").value;
        actionInput = actionInput.replace(/[^MLR]+/g, "");
        actionInput = actionInput.toUpperCase();
        this.actions = actionInput;
    }
    
    /* Set Robot's direction */
    setDirection(direction, fromInput) {
        /* Setting from input */
        if (fromInput) var direction = document.getElementById("direction-input").value.toUpperCase();
        /* Error Checking */
        if (direction != 'N' && direction != 'E' && direction != 'S' && direction != 'W' && direction != '') return;
        
        this.currentDirection = direction;
        document.getElementById("direction").innerHTML = "Direction faced: " + this.currentDirection;
    }
    
    begin() {
        this.findPosition(this.xPosition, this.yPosition, this.currentDirection, this.actions);
    }
    
    findPosition(x, y, direction, actions) {
        this.currentPosition = "[" + x + ", " + y + "]";
        var row = 7 - (y - 1);
        var col = x - 1;
        
        this.board[row][col]++;

        for (var i = 0; i < this.actions.length; i++) {
          var action = actions.charAt(i);

          if (action == 'M') this.move();
          if (action == 'L') this.turn(this.currentDirection, action);
          if (action == 'R') this.turn(this.currentDirection, action);
        }
      }
    
    move() {

        switch(this.currentDirection) {
          case 'N':
            if ( ++this.yPosition > 8) this.yPosition--;
            break;

          case 'E':
            if ( ++this.xPosition > 8) this.xPosition--;
            break;

          case 'S':
            if ( --this.yPosition < 1) this.yPosition++;
            break;

          case 'W':
            if ( --this.xPosition < 1) this.xPosition++;
            break;

          default:
            break;
        }

        // Convert x and y Positions to matrix indices
        var row = 7 - (this.yPosition - 1);
        var col = this.yPosition - 1;

        this.board[row][col]++;

        this.currentPosition = "[" + this.xPosition + ", " + this.yPosition + "]";
        document.getElementById("location").innerHTML = "Location: " + this.currentPosition;
        document.getElementById("direction").innerHTML = "Direction faced: " + this.currentDirection;
  }

    
    turn(direction, turn) {
        // Get enumeration of direction
        var current = this.dir_map.get(direction);

        // Transform current enumeration of direction based on turn direction
        if (turn == 'L') {
          if (--current < 0) current += this.directions.length;
        } else {
          if (++current >= this.directions.length) current %= this.directions.length;
        } 

        this.currentDirection = this.directions[current];
        document.getElementById("direction").innerHTML = "Direction faced: " + this.currentDirection;
    }
}

var myBoard = new boardGame(1, 1, 'N', "");