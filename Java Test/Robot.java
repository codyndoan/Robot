/* Java Tester for Functionality */
import java.util.*;

public class Robot {
  
  private static char currentDirection;
  private static String currentPlace;
  private static int x;
  private static int y;
  private static char[] directions = {'N','E','S','W'}; 
  private static HashMap<Character, Integer> dir_map = createMap();
  private static HashMap<Character, Integer> createMap() {
    HashMap<Character, Integer> map = new HashMap<Character, Integer>();
    map.put('N', new Integer(0));
    map.put('E', new Integer(1));
    map.put('S', new Integer(2));
    map.put('W', new Integer(3));
    return map;
  }
  private static int[][] board = new int[8][8];

  public static void reset() {
    currentPlace = "";
    currentDirection = ' ';
    for (int row = 0; row < board.length; row++) {
      for (int col = 0; col < board[row].length; col++) {
        board[row][col] = 0;
      }
    }
  }

  public static void move() {
   
    /* Increment/Decrement based on current direction */
    /* Reverse increments/decrements if out of bounds [1,8] */
    switch(currentDirection) {
      case 'N':
        if ( ++y > board.length) y--;
        break;
      
      case 'E':
        if ( ++x > board[0].length) x--;
        break;
      
      case 'S':
        if ( --y < 1) y++;
        break;
      
      case 'W':
        if ( --x < 1) x++;
        break;
  
      default:
        break;
    }
    
    // Convert x and y coordinates to matrix indices
    int row = board[0].length - 1 - (y - 1);
    int col = x - 1;
    
    // Increment cell to count actions which occurred at that cell
    board[row][col]++;

    currentPlace = "[" + x + ", " + y + "]";
  }

  public static void turn(char direction, char turn) {
    // Get index of current direction
    int current = dir_map.get(direction);
    
    // Decrement index if Left turn else Increment index for Right turn.
    // Account for changes out of bounds.
    if (turn == 'L') {
      if (--current < 0) current += directions.length;
    } else {
      if (++current >= directions.length) current %= directions.length;
    } 
    
    // Get new direction
    currentDirection = directions[current];
  }

  public static void findPosition(int xCoord, int yCoord, char direction, String actions) {
    actions = actions.replace(",", "");
    currentDirection = direction;
    x = xCoord;
    y = yCoord;
    currentPlace = "[" + x + ", " + y + "]";
    int row = board[0].length - 1 - (y - 1);
    int col = x - 1;
    
    System.out.println("Current Location: " + currentPlace);
    System.out.println("Current Location: " + currentDirection);
    System.out.println("Action path: " + actions + '\n');
    board[row][col]++;

    for (int i = 0; i < actions.length(); i++) {
      char action = actions.charAt(i);
      if (action == 'M') move();
      if (action == 'L') turn(currentDirection, action);
      if (action == 'R') turn(currentDirection, action);
    }
  }
  
  /* All possible paths with a restriction on number of actions.
   * Idea:
   *    - Graph problem, general idea
   *      Represent cells of board as nodes of the graph. ID each node by its coordinate on the board e.g. [1,1].
   *      Each node will thus contain an ID and a hashmap mapping a vector of possible paths from a neighbor to
   *      the neighbor's ID. 
   *      Adjacent cells have edges to each other --> They exist within each other's adjaceny lists.
   *      Starting from the start node, perform a modified BFS by not keeping track of visited nodes
   *      and keeping track of path length. The path length only accounts for the amount of M's necessary
   *      in the robot's action path. Depending on the robot's current direction count the amount of turns
   *      necessary to be in the correct direction in order to move to a neighbor.
   *      Ex: If current node's ID is [1,1] and currentDirection is S, length of path from [1,1] to
   *      a node with ID [1,2] is 3 and all possible paths are L,L,M and R,R,M. Set a vector of
   *      of paths (strings) as the key mapped to the previous node's ID.
   *      
  public static void findPossible(int xOrigin, int yOrigin, char dirOrign, int xTarget, int yTarget, char
  dirTarget, int maxActions) {
  }*/


  public static void main (String[] args) {
    
    Robot bob = new Robot();
    // Test Input: [4,3] M,M,M,L,M,M,M,M,R,R,R
    bob.findPosition(4, 3, 'N', "M,M,M,L,M,M,M,M,R,R,R");

    for (int[] rows : board) {
      System.out.println(Arrays.toString(rows));
    }

    System.out.println('\n' + "Location: " + currentPlace);
    System.out.println("Direction faced: " + currentDirection + '\n');
    
    bob.reset();

    // Test Input: [2,3] M,M,M,L,M,R,R,R
    bob.findPosition(2, 3, 'N', "M,M,M,L,M,R,R,R");

    for (int[] rows : board) {
      System.out.println(Arrays.toString(rows));
    }
    
    System.out.println('\n' + "Location: " + currentPlace);
    System.out.println("Direction faced: " + currentDirection + '\n');

    bob.reset();


    bob.findPosition(8, 1, 'W', "M,M,M,M,M,M,R,M,M,M,M,L,R,L,M");

    for (int[] rows : board) {
      System.out.println(Arrays.toString(rows));
    }
    
    System.out.println('\n' + "Location: " + currentPlace);
    System.out.println("Direction faced: " + currentDirection + '\n');

    bob.reset();

    //Robot.findPossible(2, 3,'N', 3, 4, 'S', 4);

  } 
}


