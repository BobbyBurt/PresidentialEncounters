/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import setScriptJSON from "script/testSet2.json";
/* END-USER-IMPORTS */

export default class GameScene extends Phaser.Scene {

	constructor() {
		super("game");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// scriptText
		const scriptText = this.add.bitmapText(78, 479, "nokia", "New BitmapText");
		scriptText.text = "New BitmapText";
		scriptText.fontSize = -40;

		this.scriptText = scriptText;

		this.events.emit("scene-awake");
	}

	private scriptText!: Phaser.GameObjects.BitmapText;

	/* START-USER-CODE */

  create() {
    this.editorCreate();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */
