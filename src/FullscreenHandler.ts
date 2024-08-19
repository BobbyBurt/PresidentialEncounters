/** @format */

/** Listens for fullscreen set event and adjusts all scene cameras. */
export default class fullscreenHandler {
  private game: Phaser.Game;

  static readonly fullscreenRes = { width: 1920, height: 1080, zoom: 1 };
  static readonly windowedRes = { width: 1280, height: 720, zoom: 0.67 };
  static readonly anbernicRes = { width: 640, height: 480, zoom: 0.67 };
  // I don't know why the windowed zoom is a weird number like this.

  constructor(game: Phaser.Game) {
    this.game = game;

    this.game.scale.on("enterfullscreen", this.setFullscreen, this);
    this.game.scale.on("leavefullscreen", this.setWindowed, this);
  }

  /** Callback to adjusts game elements. The scalemanager has already set fullscreen at this point. */
  private setFullscreen() {
    this.game.scale.setGameSize(
      fullscreenHandler.fullscreenRes.width,
      fullscreenHandler.fullscreenRes.height
    );
    this.adjustAllCameras(true);
  }

  /** Callback to adjusts game elements. The scalemanager has already set fullscreen at this point. */
  private setWindowed() {
    this.game.scale.setGameSize(
      fullscreenHandler.windowedRes.width,
      fullscreenHandler.windowedRes.height
    );
    this.adjustAllCameras(false);
  }

  /**
   * Calls `adjustCamera()` for all active cameras
   * @param fullscreen if `undefinded`, will be set to current fullscreen state
   */
  private adjustAllCameras(fullscreen?: boolean) {
    this.game.scene.getScenes(true).forEach((scene: Phaser.Scene) => {
      fullscreenHandler.adjustCamera(scene.cameras.main, fullscreen);
    });
  }

  /**
   * Sets camera zoom and center
   * @param fullscreen if `undefinded`, will be set to current fullscreen state
   */
  static adjustCamera(
    camera: Phaser.Cameras.Scene2D.BaseCamera,
    fullscreen?: boolean
  ) {
    if (fullscreen == undefined) {
      fullscreen = camera.scene.scale.isFullscreen;
    }
    camera.scene.cameras.main.setZoom(
      fullscreen ? this.fullscreenRes.zoom : this.windowedRes.zoom
    );
    camera.scene.cameras.main.centerOn(960, 540);
  }
}
