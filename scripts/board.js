class boardGame {
    
    /* Game Constructor */
    constructor(x, y, direction, actions) {

        this.board = [];
        for (var i = 0; i < 8; i++) this.board.push([0,0,0,0,0,0,0,0]);
        
        if (arguments.length != 4) {
            this.xCoordinate = 1;
            this.yCoordinate = 1;
            this.currentPosition = "[" + this.xCoordinate + ", " + this.yCoordinate + "]";
            this.currentDirection = 'N';
            this.actions = '';
        } else {
            this.xCoordinate = x;
            this.yCoordinate = y;
            this.currentPosition = "[" + this.xCoordinate + ", " + this.yCoordinate + "]";
            this.currentDirection = direction;
            this.actions = actions;   
        }
        
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
        var input, origin;
        input = document.getElementById("origin-input");
        origin = input.value;
        document.getElementById("location").innerHTML = "Location: " + this.currentPosition;
        console.log(origin);
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
        this.findPosition(this.xCoordinate, this.yCoordinate, this.currentDirection, this.actions);
        console.log(this.currentPosition);
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
        // Convert x and y coordinates to matrix indices

        switch(this.currentDirection) {
          case 'N':
            if ( ++this.yCoordinate > 8) this.yCoordinate--;
            break;

          case 'E':
            if ( ++this.xCoordinate > 8) this.xCoordinate--;
            break;

          case 'S':
            if ( --this.yCoordinate < 1) this.yCoordinate++;
            break;

          case 'W':
            if ( --this.xCoordinate < 1) this.yCoordinate++;
            break;

          default:
            break;
        }

        var row = 7 - (this.yCoordinate - 1);
        var col = this.yCoordinate - 1;

        this.board[row][col]++;

        this.currentPosition = "[" + this.xCoordinate + ", " + this.yCoordinate + "]";
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

var myBoard = new boardGame();