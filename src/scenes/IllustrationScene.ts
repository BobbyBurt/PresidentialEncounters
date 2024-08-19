/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import CharacterPrefab from "../prefabs/CharacterPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class IllustrationScene extends Phaser.Scene {
  constructor() {
    super("illustration");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // whiteBG
    const whiteBG = this.add.rectangle(640, 360, 1280, 720);
    whiteBG.isFilled = true;

    // oval_office
    const oval_office = this.add.image(640, 360, "oval-office");
    oval_office.alpha = 0.7;
    oval_office.alphaTopLeft = 0.7;
    oval_office.alphaTopRight = 0.7;
    oval_office.alphaBottomLeft = 0.7;
    oval_office.alphaBottomRight = 0.7;

    // alienBody
    const alienBody = this.add.sprite(
      369,
      371,
      "alien-test-1",
      "idle-body/0000"
    );
    alienBody.visible = false;

    // alienHead
    const alienHead = this.add.sprite(
      369,
      371,
      "alien-test-1",
      "idle-head/0000"
    );
    alienHead.visible = false;

    // alienFace
    const alienFace = this.add.sprite(
      369,
      371,
      "alien-test-1",
      "idle-face/0000"
    );
    alienFace.visible = false;

    // body_png
    const body_png = this.add.sprite(893, 368, "test-2", "body");
    body_png.scaleX = 0.5;
    body_png.scaleY = 0.5;
    body_png.visible = false;

    // head_png
    const head_png = this.add.sprite(893, 368, "test-2", "head");
    head_png.scaleX = 0.5;
    head_png.scaleY = 0.5;
    head_png.visible = false;

    // face_png
    const face_png = this.add.sprite(893, 368, "test-2", "face0001");
    face_png.scaleX = 0.5;
    face_png.scaleY = 0.5;
    face_png.visible = false;

    // characterContainer
    const characterContainer = new CharacterPrefab(this, 654, 309);
    this.add.existing(characterContainer);

    this.alienBody = alienBody;
    this.alienHead = alienHead;
    this.alienFace = alienFace;
    this.body_png = body_png;
    this.head_png = head_png;
    this.face_png = face_png;
    this.characterContainer = characterContainer;

    this.events.emit("scene-awake");
  }

  private alienBody!: Phaser.GameObjects.Sprite;
  private alienHead!: Phaser.GameObjects.Sprite;
  private alienFace!: Phaser.GameObjects.Sprite;
  private body_png!: Phaser.GameObjects.Sprite;
  private head_png!: Phaser.GameObjects.Sprite;
  private face_png!: Phaser.GameObjects.Sprite;
  private characterContainer!: CharacterPrefab;

  /* START-USER-CODE */

  create() {
    this.editorCreate();

    this.scene.sendToBack();

    this.characterContainer.createAnims("alien-test-1", [
      { key: "idle", repeat: -1, end: 31 },
    ]);
    this.characterContainer.playAnim("idle");
    this.tweens.add({
      targets: this.characterContainer,
    });

    // this.alienFace.anims.create({
    //   key: "idle",
    //   repeat: -1,
    //   frames: this.anims.generateFrameNames("alien-test-1", {
    //     prefix: "idle-face/",
    //     zeroPad: 4,
    //     end: 31,
    //   }),
    // });
    // this.alienFace.anims.play("idle");

    // this.face_png.anims.create({
    //   key: "idle",
    //   repeat: -1,
    //   frames: this.anims.generateFrameNames("test-2", {
    //     prefix: "face",
    //     zeroPad: 4,
    //     end: 5,
    //   }),
    // });
    // this.face_png.anims.play("idle");
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
