/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ScriptTextPrefab extends Phaser.GameObjects.BitmapText {
  constructor(scene: Phaser.Scene, x?: number, y?: number, font?: string) {
    super(scene, x ?? -162, y ?? -20, font ?? "calibri");

    this.tintTopLeft = 3881787;
    this.tintTopRight = 3881787;
    this.tintBottomLeft = 3881787;
    this.tintBottomRight = 3881787;
    this.text = "New BitmapText";
    this.fontSize = -40;
    this.maxWidth = 950;

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */

  readonly MAX_LINES = 3;

  private dialogue = "";

  private typewriterCharIndex = 0;
  private typewriterCharEvent: Phaser.Time.TimerEvent;

  /**
   * Wraps the text and creates a timer for a typewriter effect.
   *
   * A warning will be logged if the dialogue exceeds max lines.
   * @param value dialogue / narration
   */
  public setDialogue(value: string) {
    this.setText(value);
    let wrappedText = this.getTextBounds(false).wrappedText;
    this.dialogue = wrappedText;
    this.setText("");

    this.blankNameCheck();

    if (wrappedText.split(`\n`).length > this.MAX_LINES + 1) {
      console.warn("Max dialogue lines exceeded!");
    }

    this.typewriterCharIndex = 0;
    if (this.typewriterCharEvent) {
      this.typewriterCharEvent.remove();
    }
    this.typewriterCharEvent = this.scene.time.addEvent({
      loop: true,
      delay: 40,
      callback: () => {
        if (this.dialogue.length < this.text.length) {
          this.typewriterCharEvent.remove();
        }
        this.setText(
          this.text + this.dialogue.charAt(this.typewriterCharIndex)
        );
        this.typewriterCharIndex++;
      },
    });
  }

  /** Set container's visibility based on if there's a name set. */
  private blankNameCheck() {
    if (
      this.dialogue == undefined ||
      this.dialogue === "" ||
      this.dialogue === " " ||
      this.dialogue === "  "
    ) {
      this.setVisible(false);
    } else {
      this.setVisible(true);
    }
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
