interface iGameState {
  isGameRunning: boolean;
}
class GameFrame implements iGameState {
  private mainMenu: MainMenu;
  private background: Background;

  //private pauseMenu: PauseMenu;

  /* private gameWon: GameWon;
   private gameLost: GameLost;

   private powerUps: PowerUp[];
   private submarine: Submarine;
  
   private headsUpDisplay: HeadsUpDisplay;
     */

  //private collisionListener: CollisionListener;
  private controls: Control;
  private obstacles: Obstacle[];

  //private setDepth: number;
  public isGameRunning: boolean;

  public constructor() {
    this.obstacles = [new Iceberg(), new Mine()];

    //this.collisionListener = new CollisionListener();

    this.mainMenu = new MainMenu(this);
    this.controls = new Control();
    this.isGameRunning = false;
    this.background = new Background();
  }

  public update() {
    console.log(this.obstacles.length);
    this.mainMenu.update();

    if (this.isGameRunning) {
      document.getElementById("main-menu")!.style.display = "none";

      this.background.update();

      noCursor();

      for (const obstacle of this.obstacles) {
        obstacle.move();
        obstacle.randomSpawn(this.obstacles);
      }
      this.controls.update();

      //this.collisionListener.update()
    }
  }

  public draw() {
    if (this.isGameRunning) {
      document.getElementById("main-menu")!.style.display = "none";

      this.background.draw();

      noCursor();

      for (let i = 0; i < this.obstacles.length; i++) {
        const distance = dist(
          this.controls.getPositionX(),
          this.controls.getPositionY(),
          this.obstacles[i].x,
          this.obstacles[i].y
        );
        if (distance < 250) {
          this.obstacles[i].draw();
        }
      }
      this.controls.draw();

      //this.collisionListener.draw()
    }
  }
}

/* private populateObstacles() {}

   private initializePlayer() {}

   private initializePausMenu() {}

   private upwardScroll() {}

   private initilaziePowerUps() {}

   private spawnPowerUp() {}

   private spawnObstacle() {}
 */

//page loads html DOM star button.
