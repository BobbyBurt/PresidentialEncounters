/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import CharacterPrefab from "../prefabs/CharacterPrefab";
/* START-USER-IMPORTS */
import characterTweenLibrary, {
  characterTween,
} from "~/data/characterTweenLibrary";
import Director from "~/Director";
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

  /**
   * Which character will animations and tweens be applied to.
   */
  public animatedCharacter: characterKey;
  private characterContainerMap = new Map<
    characterKey,
    Phaser.GameObjects.Container
  >();

  activeTween: Phaser.Tweens.Tween;

  create() {
    this.editorCreate();

    this.scene.sendToBack();

    Director.instance.illustrationScene = this;

    this.characterContainer.createAnims("bickerton", [
      { key: "talk", repeat: -1, end: 0 },
      { key: "idle", repeat: -1, end: 0 },
      { key: "angle-talk", repeat: -1, end: 0 },
      { key: "angle-idle", repeat: -1, end: 0 },
      { key: "angle-nod", repeat: 0, end: 30 },
    ]);
  }

  public playAnim(key: string) {
    this.characterContainer.playAnim(key, true);
  }

  public playTween(tweenConfig: characterTween) {
    let tweenConfigInstance: characterTween = { targets: undefined };
    Object.assign(tweenConfigInstance, tweenConfig);
    // Necessary because objects are assign by reference.

    let characterContainer = this.characterContainer;
    tweenConfigInstance.targets = characterContainer;
    if (tweenConfigInstance.x && tweenConfigInstance.relativePosition) {
      tweenConfigInstance.x = characterContainer.x + tweenConfigInstance.x;
    }
    if (tweenConfigInstance.y && tweenConfigInstance.relativePosition) {
      tweenConfigInstance.y = characterContainer.y + tweenConfigInstance.y;
    }
    if (tweenConfigInstance.startingX) {
      characterContainer.setX(tweenConfigInstance.startingX);
    }
    if (tweenConfigInstance.startingY) {
      characterContainer.setY(tweenConfigInstance.startingY);
    }
    if (this.activeTween) {
      this.activeTween.remove();
    }
    this.activeTween = this.tweens.add(tweenConfigInstance);
    this.activeTween.play();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

export type characterKey = "alien" | "pres" | "wife";
