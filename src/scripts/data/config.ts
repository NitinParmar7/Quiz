import "phaser";
import BootScene from "../scenes/bootScene";
import GameScene from "../scenes/gameScene";
import PreloadScene from "../scenes/preloadScene";

export const GAME_WIDTH = 1080;
export const GAME_HEIGHT = 1920;
export const HALF_WIDTH = 540;
export const HALF_HEIGHT = 960;

export const Config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: 0x000000,
  scene: [BootScene, PreloadScene, GameScene],
  parent: "game-canvas",
  dom: {
    createContainer: true,
  },
  scale: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    mode: Phaser.Scale.FIT,
    autoRound: true,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    fullscreenTarget: "game-canvas",
  },
  audio: {
    disableWebAudio: true,
  },
};

export const SCENES = {
  BootScene: "BootScene",
  PreloadScene: "PreloadScene",
  GameScene: "GameScene",
};
