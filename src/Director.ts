/** @format */

import ControlHandler from "./ControlHandler";
import ChoiceScene from "./scenes/ChoiceScene";
import DialogueScene from "./scenes/DialogueScene";
import IllustrationScene from "./scenes/IllustrationScene";

/**
 * Interprets JSON script data and stores it. Controls the game scenes.
 */
export default class Director {
  /**
   * Private to avoid `new` calls
   */
  private constructor() {}

  private static _instance: Director;
  public static get instance(): Director {
    if (!Director._instance) {
      Director._instance = new Director();
    }
    return Director._instance;
  }

  private controlHandler = new ControlHandler();

  private _dialogueScene: DialogueScene;
  public set dialogueScene(scene: DialogueScene) {
    this._dialogueScene = scene;
    this.controlHandler.dialogueScene = scene;
  }

  private _illustrationScene: IllustrationScene;
  public set illustrationScene(scene: IllustrationScene) {
    this._illustrationScene = scene;
    this.controlHandler.illustrationScene = scene;
  }
  private _choiceScene: ChoiceScene;
  public set choiceScene(scene: ChoiceScene) {
    this._choiceScene = scene;
    this.controlHandler.choiceScene = scene;
  }

  private dialogueSequenceMap: Map<string, Array<string>>;

  /**
   * The dialogue sequence key to queue up for each option in last displayed choice.
   */
  private optionsDialogueSeqKey: Array<string>;

  private currentLineIndex = -1;
  private currentDialogueSeqKey = "";
  public queuedSequenceKey: string | null;

  /** Checking the scene active state won't do because it's not updated instantly. */
  private choiceSceneActive = false;

  public loadSet(key: string, game: Phaser.Game) {
    this.populateDialogueMap(game.cache.json.get(key));
    this.currentDialogueSeqKey = Array.from(this.dialogueSequenceMap)[0][0];
    this.currentLineIndex = -1;
    this.queuedSequenceKey = null;
  }

  /**
   * Fill the dialogue map with dialogue from the JSON
   */
  private populateDialogueMap(data: dialogueSequenceJSON) {
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

  /**
   * Advances the dialogue line or begins a new dialogue sequence.
   * Will abort if the `choice` scene is awake.
   * @returns
   */
  public advanceText() {
    if (this.choiceSceneActive) {
      return;
    }
    // This check doesn't pass until the next frame when the scene is put to sleep.
    // TODO: fix

    if (!this.nextSequenceCheck()) {
      this.currentLineIndex++;
    }

    let script = this.interpretControls(
      this.dialogueSequenceMap.get(this.currentDialogueSeqKey)![
        this.currentLineIndex
      ]
    );
    this.controlHandler.handleControls(script.controls);
    this._dialogueScene.setDialogue(script.dialogue);
  }

  /**
   * Puts `choice` scene to sleep and calls to advance text
   * @param optionIndex
   */
  public selectOption(optionIndex: number) {
    console.assert(optionIndex >= 0 && optionIndex <= 3);

    this._choiceScene.scene.sleep();
    this.choiceSceneActive = false;

    this.currentDialogueSeqKey = this.optionsDialogueSeqKey[optionIndex];
    this.currentLineIndex = -1;
    // Lazy, bad workaround to the fact that the nextSquenceCheck doesn't count this as a new sequence.
    this.advanceText();
  }

  /**
   * Check if we're at the end of the sequence. If so, load the queued one. If nothing is queued, load the next one in the map.
   * @returns true if the next sequence was set.
   */
  private nextSequenceCheck(): boolean {
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
            this.choiceSequenceCheck();
            break;
          }
        }
        return true;
      } else {
        this.currentDialogueSeqKey = this.queuedSequenceKey;
        this.queuedSequenceKey = null;
        this.currentLineIndex = 0;
        this.choiceSequenceCheck();
        return true;
      }
    }
    return false;
  }

  /**
   * Is this sequence? If so, interpret sequence differently and set choice scene
   */
  private choiceSequenceCheck() {
    if (this.currentDialogueSeqKey.includes("CHOICE-")) {
      this.optionsDialogueSeqKey = new Array<string>();
      this._choiceScene.optionList.forEach((optionPrefab, index) => {
        let choiceScript = this.interpretControls(
          this.dialogueSequenceMap.get(this.currentDialogueSeqKey)![
            1 + index * 2
          ]
        );
        optionPrefab.setText(choiceScript.dialogue);
        this.controlHandler.handleControls(
          choiceScript.controls,
          optionPrefab.text
        );

        this.optionsDialogueSeqKey[index] = this.dialogueSequenceMap.get(
          this.currentDialogueSeqKey
        )![(index + 1) * 2];
      });

      this._choiceScene.scene.wake();
      this.choiceSceneActive = true;
    }
  }

  /**
   * Returns the dialogue and it's controls separated
   * @param dialogue
   * @returns The dialogue and it's controls separated
   */
  private interpretControls(dialogue: string): {
    dialogue: string;
    controls: Array<string>;
  } {
    let splitDialogue = dialogue.split("\\");
    let newDialogue = "";
    let controls = new Array<string>();
    splitDialogue.forEach((dialogue, index) => {
      if (index % 2 !== 1) {
        newDialogue += dialogue;
      } else {
        // this.controlHandler.setControl(dialogue);
        controls.push(dialogue);
      }
    });
    // return newDialogue;
    return { dialogue: newDialogue, controls: controls };
  }
}

type dialogueSequenceJSON = {
  dialogueSequences: Array<Array<string>>;
  // sequence, line
};
