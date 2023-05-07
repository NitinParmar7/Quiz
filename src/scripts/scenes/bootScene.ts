import { ASSET_PATH } from "../data/assetpath";
import { SCENES } from "../data/config";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENES.BootScene);
  }

  preload() {
    this.load.multiatlas(
      ASSET_PATH.PRELOAD.KEY,
      ASSET_PATH.PRELOAD.DATA,
      ASSET_PATH.PATH
    );
  }

  create() {
    this.scene.start(SCENES.PreloadScene);
  }
}
