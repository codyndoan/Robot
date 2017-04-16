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

  public static void move() {
    // Convert x and y coordinates to matrix indices
    
    switch(currentDirection) {
      case 'N':
        if ( ++y > 8) y--;
        break;
      
      case 'E':
        if ( ++x > 8) x--;
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
    
    int row = board[0].length - 1 - (y - 1);
    int col = x - 1;
     
    board[row][col]++;

    currentPlace = "[" + x + ", " + y + "]";
  }

  public static void turn(char direction, char turn) {
    // Get enumeration of direction
    int current = dir_map.get(direction);
    
    // Transform current enumeration of direction based on turn direction
    if (turn == 'L') {
      if (--current < 0) current += directions.length;
    } else {
      if (++current >= directions.length) current %= directions.length;
    } 

    currentDirection = directions[current];
  }

  public static void findPosition(int xCoord, int yCoord, char direction, String actions) {
    currentDirection = direction;
    x = xCoord;
    y = yCoord;
    currentPlace = "[" + x + ", " + y + "]";
    int row = board[0].length - 1 - (y - 1);
    int col = x - 1;
    
    System.out.println(currentPlace);
    board[row][col]++;

    for (int i = 0; i < actions.length(); i++) {
      char action = actions.charAt(i);

      if (action == 'M') move();
      if (action == 'L') turn(currentDirection, action);
      if (action == 'R') turn(currentDirection, action);
    }
  }
  

  public static void main (String[] args) {

    Robot bob = new Robot();
    Robot.findPosition(4, 3, 'N', "MMMLMMMMRRR");

    for (int[] rows : board) {
      System.out.println(Arrays.toString(rows));
    }

    System.out.println(currentPlace);
    System.out.println(currentDirection);

  } 
}


