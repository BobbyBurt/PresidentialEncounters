/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Director from "~/Director";
/* START-USER-IMPORTS */
import fullscreenHandler from "~/FullscreenHandler";
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorPreload(): void {
    this.load.pack(
      "prototype-asset-pack",
      "assets/prototype/prototype-asset-pack.json"
    );
    this.load.pack("asset-pack", "assets/asset-pack.json");
  }

  editorCreate(): void {
    // progress
    const progress = this.add.text(240, 104, "", {});
    progress.setOrigin(0.5, 0.5);
    progress.tintTopLeft = 9737364;
    progress.tintTopRight = 9737364;
    progress.tintBottomLeft = 9737364;
    progress.tintBottomRight = 9737364;
    progress.text = "0%";
    progress.setStyle({ fontSize: "-64px" });

    this.events.emit("scene-awake");
  }

  /* START-USER-CODE */

  loaded = false;

  preload() {
    this.editorCreate();

    this.editorPreload();

    this.scale.autoRound = true;

    let _fullscreenHandler = new fullscreenHandler(this.game);
    // is this garbage collected when this scene stops?

    this.cameras.main.setOrigin(0, 0);
    this.cameras.main.setViewport(0, 0, this.scale.width, this.scale.height);
    this.cameras.main.setBackgroundColor(0x242424);

    // load event
    this.load.on(Phaser.Loader.Events.COMPLETE, () => {
      this.loaded = true;

      // DEBUG: auto load
      if (__DEV__) {
        // this.start();
        // mobile detection will not run if enabled
      }
    });

    this.load.on("filecomplete", (key: string, type: string, data: any) => {
      // this.fileText.setText(this.fileText.text + `\nloaded: ${key} ${type}`)
      // this.fileText.setY(this.fileText.y - 10)
    });

    this.load.on("complete", (key: string, type: string, data: any) => {
      Director.instance.loadSet("PolicySet", this.game);

      this.scene.stop(this);
      this.scene.launch("illustration");
      this.scene.launch("dialogue");
      this.scene.launch("choice");
    });

    this.scene.launch("medal");

    this.scene.launch("debug");
  }
}

/* END OF COMPILED CODE */

// You can write more code here
