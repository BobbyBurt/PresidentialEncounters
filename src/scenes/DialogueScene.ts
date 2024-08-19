/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ScriptTextPrefab from "../prefabs/ScriptTextPrefab";
/* START-USER-IMPORTS */
import fullscreenHandler from "~/FullscreenHandler";
/* END-USER-IMPORTS */

export default class DialogueScene extends Phaser.Scene {
  constructor() {
    super("dialogue");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // dialogueBack
    const dialogueBack = this.add.rectangle(640, 597, 1050, 180);
    dialogueBack.isFilled = true;
    dialogueBack.fillAlpha = 0.8;
    dialogueBack.isStroked = true;
    dialogueBack.lineWidth = 5;

    // scriptText
    const scriptText = new ScriptTextPrefab(this, 146, 523);
    this.add.existing(scriptText);

    // dialogueBack_1
    const dialogueBack_1 = this.add.rectangle(115, 447, 300, 60);
    dialogueBack_1.setOrigin(0, 0);
    dialogueBack_1.isFilled = true;
    dialogueBack_1.fillAlpha = 0.8;
    dialogueBack_1.isStroked = true;
    dialogueBack_1.lineWidth = 5;

    // characterNameText
    const characterNameText = this.add.bitmapText(
      146,
      451,
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

    this.scriptText = scriptText;
    this.characterNameText = characterNameText;

    this.events.emit("scene-awake");
  }

  private scriptText!: ScriptTextPrefab;
  private characterNameText!: Phaser.GameObjects.BitmapText;

  /* START-USER-CODE */

  dialogueSequenceMap: Map<string, Array<string>>;

  currentLineIndex = 0;
  currentDialogueSeqKey = "";
  queuedSequenceKey: string | null;

  create() {
    this.editorCreate();

    this.populateDialogueMap(this.cache.json.get("set-test"));
    this.setText("pres-test");

    this.setupInput();
  }

  /**
   * Fill the dialogue map with dialogue from the JSON
   */
  populateDialogueMap(data: dialogueSequenceJSON) {
    this.dialogueSequenceMap = new Map();

    data.dialogueSequences.forEach((dialogueSequence) => {
      let keySplit = dialogueSequence[0].split("; ", 2);

      console.assert(
        keySplit.length > 1,
        `Dialogue sequence has no valid key.`
      );

      let key = keySplit[0];
      let editedDialogueSequence = dialogueSequence;
      editedDialogueSequence[0] = keySplit[1];
      this.dialogueSequenceMap.set(key, editedDialogueSequence);
    });
  }

  setupInput() {
    this.input.keyboard?.on(`keydown-A`, () => {
      this.setText(this.currentDialogueSeqKey);
    });
    this.input.on("pointerdown", () => {
      // TODO: have this be specific to the dialogue back rect
      this.setText(this.currentDialogueSeqKey);
    });
  }

  /**
   *
   * @param dialogueSeqKey If different from the current one, `currentLineIndex` will be set to 0. Otherwise, line will advance in the current sequence. If at the end of the sequence, the queued sequence or next up in the map will start.
   * @returns
   */
  setText(dialogueSeqKey: string) {
    if (dialogueSeqKey !== this.currentDialogueSeqKey) {
      this.currentDialogueSeqKey = dialogueSeqKey;
      this.currentLineIndex = 0;
    } else {
      if (!this.nextSequenceCheck()) {
        this.currentLineIndex++;
      }
    }

    let dialogue = this.interpretControls(
      this.dialogueSequenceMap.get(this.currentDialogueSeqKey)![
        this.currentLineIndex
      ]
    );

    this.scriptText.setDialogue(dialogue + "");
  }

  /**
   * Check if we're at the end of the sequence. If so, load the queued one. If nothing is queued, load the next one in the map.
   * @returns true if the next sequence was set.
   */
  nextSequenceCheck(): boolean {
    if (
      this.currentLineIndex ===
      this.dialogueSequenceMap.get(this.currentDialogueSeqKey)!.length - 1
    ) {
      if (this.queuedSequenceKey == null) {
        let sequenceArray = Array.from(this.dialogueSequenceMap.keys());

        for (var i = 0; i < sequenceArray.length; i++) {
          if (sequenceArray[i] === this.currentDialogueSeqKey) {
            this.currentDialogueSeqKey = sequenceArray[i + 1];
            this.currentLineIndex = 0;
            break;
          }
        }
        return true;
      } else {
        this.currentDialogueSeqKey = this.queuedSequenceKey;
        this.queuedSequenceKey = null;
        this.currentLineIndex = 0;
        return true;
      }
    }
    return false;
  }

  /**
   * Handles the controls in the dialogue and returns a version of the dialogue with them removed.
   * @param dialogue
   * @returns
   */
  interpretControls(dialogue: string) {
    let splitDialogue = dialogue.split("\\");
    let newDialogue = "";
    splitDialogue.forEach((dialogue, index) => {
      if (index % 2 !== 1) {
        newDialogue += dialogue;
      } else {
        this.setControl(dialogue);
      }
    });
    return newDialogue;
  }

  /**
   * Handles the control strings from the script for various AV.
   * @param control The control type in caps and the control key seperatted by `: `. Example: `AUDIO: pres-scream`
   */
  setControl(control: string) {
    const split = control.split(": ");
    const controlType = split[0];
    const controlKey = split[1];
    if (controlType === "AUDIO") {
      if (this.cache.audio.has(controlKey)) {
        this.sound.play(controlKey);
      } else {
        console.warn(`Audio control key doesn't exist in the cache!`);
      }
    } else if (controlType === "NEXT") {
      this.queuedSequenceKey = controlKey;
    } else if (controlType === "NAME") {
      this.characterNameText.setText(controlKey);
    }

    // Each control type can have it's own function. that and this function can be in it's own class since it's lower level, and those handler functions don't need to be accessed here. keep em private.
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

interface dialogueSequenceJSON {
  dialogueSequences: Array<Array<string>>;
  // sequence, line
}
