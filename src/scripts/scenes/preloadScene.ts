import { ASSET_PATH } from "../data/assetpath";
import { HALF_HEIGHT, HALF_WIDTH, SCENES } from "../data/config";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENES.PreloadScene);
  }

  preload() {
    let bg = this.add.image(
      HALF_WIDTH,
      HALF_HEIGHT,
      ASSET_PATH.PRELOAD.KEY,
      ASSET_PATH.PRELOAD.SPRITES.BG
    );

    let preloadLogo = this.add.image(
      HALF_WIDTH,
      HALF_HEIGHT - 250,
      ASSET_PATH.PRELOAD.KEY,
      ASSET_PATH.PRELOAD.SPRITES.LOADING_LOGO
    );

    let preloadBarBG = this.add.image(
      HALF_WIDTH,
      HALF_HEIGHT + 200,
      ASSET_PATH.PRELOAD.KEY,
      ASSET_PATH.PRELOAD.SPRITES.LOADBAR_BOT
    );

    let preloadBar = this.add.image(
      HALF_WIDTH,
      HALF_HEIGHT + 200,
      ASSET_PATH.PRELOAD.KEY,
      ASSET_PATH.PRELOAD.SPRITES.LOADBAR_TOP
    );

    let preloadMask = this.add.image(
      HALF_WIDTH,
      HALF_HEIGHT + 200,
      ASSET_PATH.PRELOAD.KEY,
      ASSET_PATH.PRELOAD.SPRITES.LOADBAR_TOP
    );
    preloadMask.setVisible(false);

    preloadBar.mask = new Phaser.Display.Masks.BitmapMask(this, preloadMask);

    this.load.on("progress", (value: number) => {
      preloadMask.x = HALF_WIDTH - preloadBar.width + value * preloadBar.width;
    });

    this.load.multiatlas(
      ASSET_PATH.MAIN_ASSETS.KEY,
      ASSET_PATH.MAIN_ASSETS.DATA,
      ASSET_PATH.PATH
    );

    this.load.json(ASSET_PATH.DATA.KEY, ASSET_PATH.DATA.PATH);

    this.load.audio(
      ASSET_PATH.SOUND.CORRECT.KEY,
      ASSET_PATH.SOUND.CORRECT.PATH
    );

    this.load.audio(ASSET_PATH.SOUND.WRONG.KEY, ASSET_PATH.SOUND.WRONG.PATH);
    this.load.audio(ASSET_PATH.SOUND.CLOCK.KEY, ASSET_PATH.SOUND.CLOCK.PATH);
    this.load.audio(
      ASSET_PATH.SOUND.GAMEOVER.KEY,
      ASSET_PATH.SOUND.GAMEOVER.PATH
    );

    this.load.audio(
      ASSET_PATH.SOUND.QUESTION.KEY,
      ASSET_PATH.SOUND.QUESTION.PATH
    );
  }

  create() {
    this.scene.start(SCENES.GameScene);
  }
}
