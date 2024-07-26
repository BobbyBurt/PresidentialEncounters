/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class DebugScene extends Phaser.Scene {
  constructor() {
    super("debug");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // displayVarBack
    const displayVarBack = this.add.rectangle(10, 10, 50, 40);
    displayVarBack.setOrigin(0, 0);
    displayVarBack.isFilled = true;
    displayVarBack.fillColor = 0;
    displayVarBack.fillAlpha = 0.5;

    this.displayVarBack = displayVarBack;

    this.events.emit("scene-awake");
  }

  private displayVarBack!: Phaser.GameObjects.Rectangle;

  /* START-USER-CODE */

  private displayVarMap: Map<string, any>;

  /**
   * Keys are the same as `displayVarMap` and correlate to text object.
   */
  private displayVarTextMap: Map<string, Phaser.GameObjects.BitmapText>;

  private timeAtLastDisplay: number;

  create() {
    this.editorCreate();

    this.displayVarMap = new Map<string, any>();
    this.displayVarTextMap = new Map<string, Phaser.GameObjects.BitmapText>();

    // Hide scene
    this.scene.setVisible(false);
    this.input.keyboard!.on("keydown-F2", () => {
      if (__DEV__) {
        this.scene.setVisible(!this.scene.isVisible());
        this.scene.bringToTop();
      }
    });

    // this.DisplayVar(
    //   "instructions",
    //   "Use the enter key to complete hacking scene"
    // );
  }

  /**
   * Display a variable on screen.
   *
   * Variables will be listed in the order that they're passed.
   *
   * @param label Also used as a key to store vars. Var will overwrite existing vars with the same key.
   * @param variable
   */
  public DisplayVar(label: string, variable: any) {
    // Update or create text object
    variable = JSON.stringify(variable);
    const text = `${label}: ${variable}`;
    if (this.displayVarMap.has(label)) {
      // Var exists in map

      this.displayVarTextMap.get(label)?.setText(text);
    } else {
      // Var doesn't exist in map

      // Create text object
      const textY = (this.displayVarMap.size + 1) * 20;
      const textObject = this.add.bitmapText(20, textY, "nokia", text, -16);
      this.displayVarTextMap.set(label, textObject);
    }

    // reset backing size on new frame
    if (this.timeAtLastDisplay !== this.time.now) {
      this.displayVarBack.width = 10;
    }

    // Resize backing
    const textObject = this.displayVarTextMap.get(label)!;
    this.displayVarBack.setSize(
      textObject.displayWidth > this.displayVarBack.width
        ? textObject.displayWidth + 20
        : this.displayVarBack.width + 20,
      this.displayVarTextMap.size * 20 + 20
    );
    this.timeAtLastDisplay = this.time.now;

    this.displayVarMap.set(label, variable);

    // Is there any way to show objects?
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
