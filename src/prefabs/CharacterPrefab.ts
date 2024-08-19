/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CharacterPrefab extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x ?? 0, y ?? 0);

    // bodySprite
    const bodySprite = scene.add.sprite(0, 0, "alien-test-1", "idle-body/0000");
    this.add(bodySprite);

    // faceSprite
    const faceSprite = scene.add.sprite(
      0,
      59,
      "alien-test-1",
      "idle-face/0000"
    );
    this.add(faceSprite);

    this.bodySprite = bodySprite;
    this.faceSprite = faceSprite;

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  private bodySprite: Phaser.GameObjects.Sprite;
  private faceSprite: Phaser.GameObjects.Sprite;

  /* START-USER-CODE */

  public createAnims(
    atlasKey: string,
    animConfig: Array<{
      key: string;
      repeat: number;
      end: number;
    }>
  ) {
    animConfig.forEach((anim) => {
      this.bodySprite.anims.create({
        key: anim.key,
        repeat: anim.repeat,
        frames: this.bodySprite.anims.generateFrameNames(atlasKey, {
          prefix: `${anim.key}-body/`,
          zeroPad: 4,
          end: anim.end,
        }),
      });
      this.faceSprite.anims.create({
        key: anim.key,
        repeat: anim.repeat,
        frames: this.bodySprite.anims.generateFrameNames(atlasKey, {
          prefix: `${anim.key}-face/`,
          zeroPad: 4,
          end: anim.end,
        }),
      });
    });
  }

  public playAnim(key: string) {
    this.bodySprite.play(key);
    this.faceSprite.play(key);
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
