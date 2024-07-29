/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import setScript from "script/testSet2.json";
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
    scriptText.fontSize = -32;

    this.scriptText = scriptText;

    this.events.emit("scene-awake");
  }

  private scriptText!: Phaser.GameObjects.BitmapText;

  /* START-USER-CODE */

  script: Array<string>;
  scriptIndex = 0;

  create() {
    this.editorCreate();

    this.readScript();

    this.input.keyboard?.on(`keydown-A`, () => {
      this.advanceText();
    });
  }

  readScript() {
    this.script = setScript.dialogueSequence.split(`\\`);

    this.scriptText.setText(this.script[0]);

    // let dialogueTest: dialogueSequence = { dialogue: 'This is my awsome dialogue \\ I could do this all day!', characterName: 'President (you)'}
  }

  advanceText() {
    this.scriptIndex++;

    if (this.scriptIndex >= this.script.length) {
      return;
    }

    if (this.script[this.scriptIndex].includes("NAME: ")) {
      console.debug(this.script[this.scriptIndex].slice(8));
      this.advanceText();
      return;
    }

    this.scriptText.setText(this.script[this.scriptIndex]);
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */
