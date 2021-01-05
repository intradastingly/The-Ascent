interface iGameState {
  isGameRunning: boolean;
}
interface ObstacleArray {
  obstacles: Obstacle[];
}
class GameFrame implements iGameState, ObstacleArray {
  private mainMenu: MainMenu;
  private background: Background;

  //private pauseMenu: PauseMenu;

  /* private gameWon: GameWon;
   private gameLost: GameLost;

   private powerUps: PowerUp[];
   private submarine: Submarine;
  
   private headsUpDisplay: HeadsUpDisplay;
     */

  private controls: Control;
  public obstacles: Obstacle[];
  private sonarAttributes: SonarAttributes;

  //private setDepth: number;

  public isGameRunning: boolean;
  //public collisionListener: CollisionListener;

  public constructor() {
    //this.collisionListener = new CollisionListener(this);
    this.sonarAttributes = new SonarAttributes();
    this.obstacles = [];
    this.mainMenu = new MainMenu(this);
    this.controls = new Control();
    this.isGameRunning = false;
    this.background = new Background();
  }

  public update() {
    this.mainMenu.update();
    if (this.isGameRunning) {
      document.getElementById("main-menu")!.style.display = "none";

      this.background.update();

      noCursor();

      this.sonarAttributes.update();
      this.controls.update();

      this.populate();
      this.sendArray(this.obstacles);
      //this.collisionListener.update();
    }
  }

  public draw() {
    noCursor();
    if (this.isGameRunning) {
      document.getElementById("main-menu")!.style.display = "none";

      this.background.draw();

      noCursor();

      this.controls.draw();
      for (const obstacle of this.obstacles) {
         obstacle.draw();
      }
    }
  }

  public populate() {
    if (random(1) < 0.01) {
      this.obstacles.push(new Iceberg());
      this.obstacles.push(new Mine());
    }
    for (const obstacle of this.obstacles) {
      obstacle.move();
      obstacle.update();
      if (this.obstacles.length > 30) {
        this.obstacles.splice(obstacle, 1);
      }
    }
  }

  public sendArray(this.obstacles){
    return this.obstacles;
  }
}
