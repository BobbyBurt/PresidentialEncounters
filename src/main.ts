/** @format */

import cloudSaves from "./API/SavesData";
import medalScene from "./API/medalScene";
import { newgroundsIOWrapper } from "./API/newgroundsIOWrapper";
import fullscreenHandler from "./FullscreenHandler";
import Preload from "./scenes/Preload";

window.addEventListener("load", function () {
  if (__DEV__) {
    console.clear();
  }

  var game = new Phaser.Game({
    title: "Presidential Encounters",
    // url: 'https://www.newgrounds.com/projects/games/1923225/preview',
    version: "0",

    // type: __DEV__ ? Phaser.CANVAS : Phaser.AUTO,
    type: Phaser.AUTO,
    backgroundColor: "#333333",
    scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      height: fullscreenHandler.windowedRes.height,
      width: fullscreenHandler.windowedRes.width,
      // width: 1920,
      // height: 1080,
    },
  });

  game.scene.add("preload", Preload);
  game.scene.add("boot", Boot, true);
  game.scene.add("medal", medalScene);
});

class Boot extends Phaser.Scene {
  private ngWrap: newgroundsIOWrapper;

  /**
   * load preload assets, then the scene
   */
  preload() {
    this.load.pack("pack", "assets/preload-asset-pack.json");
    this.load.on(Phaser.Loader.Events.COMPLETE, () =>
      this.scene.start("preload")
    );
  }

  create() {
    // NG.io event callbacks
    this.game.events.once(Phaser.Core.Events.STEP, () => {
      this.ngWrap = new newgroundsIOWrapper();
      this.ngWrap.start();
    });
    this.game.events.on(Phaser.Core.Events.STEP, () => {
      NGIO.keepSessionAlive();
      if (NGIO.isInitialized) {
        this.ngWrap.update(this.game);
      }
    });

    this.setSaveDataKeys();

    this.input.setGlobalTopOnly(true);
  }

  /**
   * Sets registry data keys that will be included in the save file.
   */
  setSaveDataKeys() {
    let dataKeys = new Array<string>();

    dataKeys.push("keys-for-data-that-should-be-saved");

    cloudSaves.setDataKeys(dataKeys);
  }
}
