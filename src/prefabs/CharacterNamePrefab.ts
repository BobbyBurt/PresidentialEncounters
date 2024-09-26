/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CharacterNamePrefab extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x ?? 0, y ?? 0);

    // backRect
    const backRect = scene.add.rectangle(0, 0, 300, 60);
    backRect.setOrigin(0, 0);
    backRect.isFilled = true;
    backRect.fillAlpha = 0.8;
    backRect.isStroked = true;
    backRect.lineWidth = 5;
    this.add(backRect);

    // characterNameText
    const characterNameText = scene.add.bitmapText(
      9,
      6,
      "calibri",
      "Character name"
    );
    characterNameText.tintTopLeft = 3881787;
    characterNameText.tintTopRight = 3881787;
    characterNameText.tintBottomLeft = 3881787;
    characterNameText.tintBottomRight = 3881787;
    characterNameText.text = "Character name";
    characterNameText.fontSize = -40;
    characterNameText.dropShadowAlpha = 0;
    characterNameText.dropShadowColor = 7697781;
    this.add(characterNameText);

    this.characterNameText = characterNameText;

    /* START-USER-CTR-CODE */
    this.initialX = this.x;
    /* END-USER-CTR-CODE */
  }

  public characterNameText: Phaser.GameObjects.BitmapText;

  /* START-USER-CODE */

  private tween: Phaser.Tweens.Tween;
  private initialX = 0;

  /**
   *
   * @param value spaces or undefined will set the container invisibile.
   */
  public setText(value: string) {
    this.characterNameText.setText(value);

    if (value == undefined || value === "" || value === " " || value === "  ") {
      this.setVisible(false);
    } else {
      this.setVisible(true);
    }

    this.setX(this.initialX + 50);
    this.setAlpha(0);
    if (this.tween) {
      this.tween.remove();
    }
    this.tween = this.scene.tweens.add({
      targets: this,
      duration: 300,
      x: this.initialX,
      alpha: 1,
      ease: Phaser.Math.Easing.Circular.Out,
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
