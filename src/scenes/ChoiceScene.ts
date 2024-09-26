/** @format */

// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import OptionPrefab from "../prefabs/OptionPrefab";
/* START-USER-IMPORTS */
import Director from "~/Director";
/* END-USER-IMPORTS */

export default class ChoiceScene extends Phaser.Scene {

	constructor() {
		super("choice");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// optionPrefab1
		const optionPrefab1 = new OptionPrefab(this, 112, 212);
		this.add.existing(optionPrefab1);

		// optionPrefab2
		const optionPrefab2 = new OptionPrefab(this, 662, 212);
		this.add.existing(optionPrefab2);

		// optionPrefab3
		const optionPrefab3 = new OptionPrefab(this, 112, 326);
		this.add.existing(optionPrefab3);

		// optionPrefab4
		const optionPrefab4 = new OptionPrefab(this, 662, 326);
		this.add.existing(optionPrefab4);

		// lists
		const optionList = [optionPrefab1, optionPrefab2, optionPrefab3, optionPrefab4];

		// optionPrefab1 (prefab fields)
		optionPrefab1.optionNumber = 0;

		// optionPrefab2 (prefab fields)
		optionPrefab2.optionNumber = 1;

		// optionPrefab3 (prefab fields)
		optionPrefab3.optionNumber = 2;

		// optionPrefab4 (prefab fields)
		optionPrefab4.optionNumber = 3;

		this.optionPrefab1 = optionPrefab1;
		this.optionPrefab2 = optionPrefab2;
		this.optionPrefab3 = optionPrefab3;
		this.optionPrefab4 = optionPrefab4;
		this.optionList = optionList;

		this.events.emit("scene-awake");
	}

	public optionPrefab1!: OptionPrefab;
	public optionPrefab2!: OptionPrefab;
	public optionPrefab3!: OptionPrefab;
	public optionPrefab4!: OptionPrefab;
	public optionList!: OptionPrefab[];

	/* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();

    Director.instance.choiceScene = this;

    this.scene.sleep();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
