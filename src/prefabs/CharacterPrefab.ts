/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CharacterPrefab extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x ?? 0, y ?? 0);

    // sprite1
    const sprite1 = scene.add.sprite(0, 0, "alien-test-1", "idle-body/0000");
    this.add(sprite1);

    // sprite2
    const sprite2 = scene.add.sprite(0, 0, "alien-test-1", "idle-body/0000");
    this.add(sprite2);

    this.sprite1 = sprite1;
    this.sprite2 = sprite2;

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  private sprite1: Phaser.GameObjects.Sprite;
  private sprite2: Phaser.GameObjects.Sprite;

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
      this.scene.anims.create({
        key: `${atlasKey}-${anim.key}`,
        repeat: anim.repeat,
        frames: this.scene.anims.generateFrameNames(atlasKey, {
          prefix: `${atlasKey}-${anim.key}/`,
          zeroPad: 4,
          end: anim.end,
        }),
      });
    });
    this.sprite1.setAlpha(1);
    this.sprite2.setAlpha(0);
  }

  /**
   *
   * @param key
   * @param fadeTransition
   */
  public playAnim(key: string, fadeTransition: boolean) {
    // if (this.sprite1.alpha > 0) {
    //   this.sprite2.play(key);
    // } else {
    this.sprite1.play(key);
    // }

    // this.scene.tweens.add({
    //   targets: this.sprite1,
    //   duration: 100,
    //   alpha: this.sprite1.alpha > 0 ? 0 : 1,
    // });
    // this.scene.tweens.add({
    //   targets: this.sprite2,
    //   duration: 100,
    //   alpha: this.sprite2.alpha > 0 ? 0 : 1,
    // });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
