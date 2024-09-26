/** @format */

import characterTweenLibrary from "./data/characterTweenLibrary";
import Director from "./Director";
import ChoiceScene from "./scenes/ChoiceScene";
import DialogueScene from "./scenes/DialogueScene";
import IllustrationScene, { characterKey } from "./scenes/IllustrationScene";

export default class ControlHandler {
  private _dialogueScene: DialogueScene;
  public set dialogueScene(scene: DialogueScene) {
    this._dialogueScene = scene;
  }

  private _illustrationScene: IllustrationScene;
  public set illustrationScene(scene: IllustrationScene) {
    this._illustrationScene = scene;
  }

  private _choiceScene: ChoiceScene;
  public set choiceScene(scene: ChoiceScene) {
    this._choiceScene = scene;
  }

  private textObject: Phaser.GameObjects.BitmapText;

  private readonly defaultFontSize = -40;

  /**
   * Handles the control strings from the script for various AV.
   * @param control Array of strings. Each item is the control type in caps and the control key seperatted by `: `. Example: `AUDIO: pres-scream`
   */
  public handleControls(
    controls: Array<string>,
    textObject?: Phaser.GameObjects.BitmapText
  ) {
    if (textObject) {
      this.textObject = textObject;
    } else {
      this.textObject = this._dialogueScene.scriptText;
    }

    controls.forEach((control, index) => {
      this.setControl(control);
    });
  }

  /**
   * Handles a control string from the script for various AV.
   * @param control The control type in caps and the control key seperatted by `: `. Example: `AUDIO: pres-scream`
   */
  private setControl(control: string) {
    const split = control.split(": ");
    const controlType = split[0];
    const controlKey = split[1];
    if (controlType === "AUDIO") {
      this.audioControl(controlKey);
    } else if (controlType === "NEXT") {
      Director.instance.queuedSequenceKey = controlKey;
    } else if (controlType === "LOAD-SET") {
      this.loadSetControl(controlKey);
    } else if (controlType === "NAME") {
      this.nameControl(controlKey);
    } else if (controlType === "FONT") {
      this.fontControl(controlKey);
    } else if (controlType === "FONT-SIZE") {
      this.fontSizeControl(Number(controlKey));
    } else if (controlType === "TWEEN") {
      this.tweenControl(controlKey);
    } else if (controlType === "ANIM") {
      this.animControl(controlKey);
    } else if (controlType === "CHAR") {
      this.charControl(controlKey);
    } else if (controlType === "SAVE-CHOICE") {
      this.saveResponse();
    } else if (controlType === "FADE") {
      this.camFadeControl(controlKey);
    }
  }

  private audioControl(key: string) {
    if (this._dialogueScene.cache.audio.has(key)) {
      this._dialogueScene.sound.play(key);
    } else {
      console.warn(`Audio control key '${key}' doesn't exist in the cache!`);
    }
  }

  private nameControl(name: string) {
    this._dialogueScene.characterName.setText(name);
  }

  private tweenControl(key: string) {
    let tweenConfig = characterTweenLibrary.tweenMap.get(key);
    if (tweenConfig) {
      this._illustrationScene.playTween(tweenConfig);
    } else {
      console.warn(
        `Tween control key: '${key}' doesn't exist in the tween library!`
      );
    }

    // TODO: functionality to specify character
  }

  private animControl(key: string) {
    this._illustrationScene.playAnim(key);
  }

  /**
   * Set the character that tween and anim controls will be applied to.
   * @param key
   */
  private charControl(key: string) {
    this._illustrationScene.animatedCharacter = key as characterKey;
  }

  /**
   * Also resets the font size to the default
   * @param Key
   */
  private fontControl(key: string) {
    this.textObject.setFont(key, this.defaultFontSize);
  }

  private fontSizeControl(size: number) {
    if (size > 0) {
      size -= size * 2;
    }
    this.textObject.setFont(this.textObject.font, size);
  }

  private loadSetControl(key: string) {
    Director.instance.loadSet(key, this._dialogueScene.game);
  }

  private camFadeControl(key: string) {
    if (key === "in") {
      this._illustrationScene.cameras.main.fadeIn(1000);
    } else {
      this._illustrationScene.cameras.main.fadeOut(1000);
    }
  }

  private saveResponse() {
    // TODO: flag Director that the response should be saved.
  }
}
