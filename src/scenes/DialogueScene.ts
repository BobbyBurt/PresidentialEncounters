/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import CharacterNamePrefab from "../prefabs/CharacterNamePrefab";
import ScriptTextPrefab from "../prefabs/ScriptTextPrefab";
/* START-USER-IMPORTS */
import fullscreenHandler from "~/FullscreenHandler";
import Director from "~/Director";
/* END-USER-IMPORTS */

export default class DialogueScene extends Phaser.Scene {

	constructor() {
		super("dialogue");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// characterName
		const characterName = new CharacterNamePrefab(this, 114, 444);
		this.add.existing(characterName);

		// dialogueBack
		const dialogueBack = this.add.rectangle(640, 597, 1050, 180);
		dialogueBack.isFilled = true;
		dialogueBack.fillAlpha = 0.8;
		dialogueBack.isStroked = true;
		dialogueBack.lineWidth = 5;

		// scriptText
		const scriptText = new ScriptTextPrefab(this, 146, 523);
		this.add.existing(scriptText);

		this.characterName = characterName;
		this.scriptText = scriptText;

		this.events.emit("scene-awake");
	}

	public characterName!: CharacterNamePrefab;
	public scriptText!: ScriptTextPrefab;

	/* START-USER-CODE */

  dialogueSequenceMap: Map<string, Array<string>>;

  currentLineIndex = 0;
  currentDialogueSeqKey = "";
  queuedSequenceKey: string | null;

  private defaultFontSize: number;

  create() {
    this.editorCreate();

    // this.populateDialogueMap(this.cache.json.get("set-test"));
    // this.setText("pres-test");

    this.setupInput();

    this.defaultFontSize = this.scriptText.fontSize;

    Director.instance.dialogueScene = this;
    Director.instance.advanceText();
  }

  setupInput() {
    this.input.keyboard?.on(`keydown-A`, () => {
      Director.instance.advanceText();
    });
    this.input.on("pointerdown", () => {
      // TODO: have this be specific to the dialogue back rect
      Director.instance.advanceText();
    });
  }

  public setDialogue(value: string) {
    this.scriptText.setDialogue(value);
  }

  /**
   *
   * @param key If `undefined`, current bitmap font will remain.
   * @param size If `undefined`, default size will be set.
   */
  public setFont(key?: string, size?: number) {
    if (!key) {
      key = this.scriptText.font;
    }
    if (!size) {
      size = this.defaultFontSize;
    } else if (size > 0) {
      size -= size * 2;
    }
    this.scriptText.setFont(key, size);
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

interface dialogueSequenceJSON {
  dialogueSequences: Array<Array<string>>;
  // sequence, line
}
