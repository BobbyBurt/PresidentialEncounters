/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Director from "~/Director";
/* END-USER-IMPORTS */

export default class OptionPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// backing
		const backing = scene.add.rectangle(0, 0, 500, 80);
		backing.setOrigin(0, 0);
		backing.isFilled = true;
		backing.fillAlpha = 0.8;
		backing.isStroked = true;
		backing.lineWidth = 5;
		this.add(backing);

		// text
		const text = scene.add.bitmapText(22, 13, "calibri", "Lorem ipsum dolor sit amet.");
		text.tintTopLeft = 3881787;
		text.tintTopRight = 3881787;
		text.tintBottomLeft = 3881787;
		text.tintBottomRight = 3881787;
		text.text = "Lorem ipsum dolor sit amet.";
		text.fontSize = -40;
		text.maxWidth = 470;
		this.add(text);

		this.backing = backing;
		this.text = text;

		/* START-USER-CTR-CODE */

    this.backing.setInteractive();
    this.backing.on("pointerover", this.pointerOver, this);
    this.backing.on("pointerout", this.pointerOut, this);
    this.backing.on("pointerdown", this.pointerDown, this);
    this.backing.on("pointerup", this.pointerUp, this);

    this.defaultTextY = this.text.y;

    /* END-USER-CTR-CODE */
	}

	private backing: Phaser.GameObjects.Rectangle;
	public text: Phaser.GameObjects.BitmapText;
	public optionNumber: number = 1;

	/* START-USER-CODE */

  private readonly DEFAULT_TEXT_SIZE = -40;
  private readonly SMALL_TEXT_SIZE = -30;
  private defaultTextY: number | undefined = undefined;
  private readonly SMALL_TEXT_OFFSET = -10;

  /**
   * Sets the text object's text, adjusting the size for longer strings.
   * @param value
   */
  public setText(value: string) {
    this.text.setText(value);

    let wrappedText = this.text.getTextBounds(false).wrappedText;

    if (wrappedText.split(`\n`).length > 1) {
      this.text.setFontSize(this.SMALL_TEXT_SIZE);
      this.text.setY(this.defaultTextY! + this.SMALL_TEXT_OFFSET);
    } else {
      this.text.setFontSize(this.DEFAULT_TEXT_SIZE);
      this.text.setY(this.defaultTextY);
    }
  }

  pointerOver() {
    this.backing.setAlpha(0.8);

    // Component can have settings for visual feedback
  }

  pointerOut() {
    this.backing.setAlpha(1);
  }

  pointerDown() {
    this.backing.setAlpha(0.6);
  }

  pointerUp() {
    this.backing.setAlpha(1);

    Director.instance.selectOption(this.optionNumber);
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
