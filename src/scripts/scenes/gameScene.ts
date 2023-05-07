import { ASSET_PATH } from "../data/assetpath";
import { GAME_HEIGHT, GAME_WIDTH, HALF_HEIGHT, HALF_WIDTH, SCENES } from "../data/config";
import APIManager from "../data/APIManager";
import sendData from "../data/APIManager";

export default class GameScene extends Phaser.Scene {
  menuContainer: Phaser.GameObjects.Container;
  gameContainer: Phaser.GameObjects.Container;
  TimerSprite: Phaser.GameObjects.Image;
  QuestionData: QuestionModule.Data;
  Questions: QuestionModule.Question[];
  QuestionText: Phaser.GameObjects.Text;
  Options: Phaser.GameObjects.Container;
  OptionsText: Phaser.GameObjects.Container;
  TimeText: Phaser.GameObjects.Text;
  currentQuestion: QuestionModule.Question;
  TimeDelay: number;
  score: number = 0;
  gameOverContainer: Phaser.GameObjects.Container;
  ScoreText: Phaser.GameObjects.Text;
  timeIndex: number;
  timeEvent: Phaser.Time.TimerEvent;
  NextQuestionIndex: number;
  nextQuestionTimeEvent: Phaser.Time.TimerEvent;
  correctSound: Phaser.Sound.BaseSound;
  wrongSound: Phaser.Sound.BaseSound;
  clockSound: Phaser.Sound.BaseSound;
  gameOverSound: Phaser.Sound.BaseSound;
  NextQuestionSound: Phaser.Sound.BaseSound;

  constructor() {
    super(SCENES.GameScene);
  }

  create() {
    this.QuestionData = this.cache.json.get(ASSET_PATH.DATA.KEY);
    this.Questions = [];
    let bg = this.add.image(HALF_WIDTH, HALF_HEIGHT, ASSET_PATH.PRELOAD.KEY, ASSET_PATH.PRELOAD.SPRITES.BG);

    this.menuContainer = this.add.container();
    let Logo = this.add.image(HALF_WIDTH, HALF_HEIGHT * 0.5, ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.LOGO);

    let playBtn = this.add.image(HALF_WIDTH, GAME_HEIGHT * 0.75, ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.PLAY_BUTTON);
    playBtn.setInteractive().on("pointerdown", this.OnPlayClicked, this);

    this.menuContainer.add([Logo, playBtn]);

    //this.OnPlayClicked();

    this.gameContainer = this.add.container();

    let blueTop = this.add.image(HALF_WIDTH, GAME_HEIGHT * 0.165, ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.BLUE_PATCH);

    this.TimerSprite = this.add.image(HALF_WIDTH, GAME_HEIGHT * 0.1, ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.TIMER_PREFIX + "01.png");

    this.TimeText = this.add.text(this.TimerSprite.x, this.TimerSprite.y, this.QuestionData.Time.toString(), { fontSize: "96px", fontStyle: "Bold", align: "center" }).setOrigin(0.5);

    this.QuestionText = this.add
      .text(HALF_WIDTH, GAME_HEIGHT * 0.2, "Single point of failure affects the transaction in decentralized?", {
        fontFamily: "ebrima",
        fontSize: "48px",
        align: "center",
      })
      .setOrigin(0.5)
      .setWordWrapWidth(GAME_WIDTH * 0.75);

    this.Options = this.add.container();

    let option1 = this.add
      .image(HALF_WIDTH, GAME_HEIGHT * 0.4, ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.OPTIONS_1)
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          this.OnClickOption(1);
        },
        this
      );

    let option2 = this.add
      .image(HALF_WIDTH, GAME_HEIGHT * 0.525, ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.OPTIONS_1)
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          this.OnClickOption(2);
        },
        this
      );

    let option3 = this.add
      .image(HALF_WIDTH, GAME_HEIGHT * 0.65, ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.OPTIONS_1)
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          this.OnClickOption(3);
        },
        this
      );

    let option4 = this.add
      .image(HALF_WIDTH, GAME_HEIGHT * 0.775, ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.OPTIONS_1)
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          this.OnClickOption(4);
        },
        this
      );

    this.Options.add([option1, option2, option3, option4]);

    this.OptionsText = this.add.container();

    let optionStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: "ebrima",
      fontSize: "36px",
      fontStyle: "Bold",
      align: "center",
      color: "#003442",
    };

    let option1Text = this.add
      .text(option1.x, option1.y, "Earning crypto by permanently lending crypto assets", optionStyle)
      .setOrigin(0.5)
      .setWordWrapWidth(option1.width - 20);

    let option2Text = this.add
      .text(option2.x, option2.y, "Earning crypto by permanently lending crypto assets", optionStyle)
      .setOrigin(0.5)
      .setWordWrapWidth(option2.width - 20);

    let option3Text = this.add
      .text(option3.x, option3.y, "Earning crypto by permanently lending crypto assets", optionStyle)
      .setOrigin(0.5)
      .setWordWrapWidth(option3.width - 20);

    let option4Text = this.add
      .text(option4.x, option4.y, "Earning crypto by permanently lending crypto assets", optionStyle)
      .setOrigin(0.5)
      .setWordWrapWidth(option4.width - 20);

    this.OptionsText.add([option1Text, option2Text, option3Text, option4Text]);

    this.gameContainer.add([blueTop, this.TimerSprite, this.TimeText, this.QuestionText, this.Options, this.OptionsText]);
    this.gameContainer.setVisible(false);

    this.gameOverContainer = this.add.container();

    let blackPanel = this.add.rectangle(HALF_WIDTH, HALF_HEIGHT, GAME_WIDTH, GAME_HEIGHT, 0x000, 0.75).setOrigin(0.5);

    let gameOverImage = this.add.image(HALF_WIDTH, HALF_HEIGHT, ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.GAMEOVER_POPUP);

    this.ScoreText = this.add
      .text(gameOverImage.x, gameOverImage.y + 100, this.score.toString(), {
        fontFamily: "FRADM",
        fontSize: "108px",
        fontStyle: "Bold",
        align: "center",
      })
      .setOrigin(0.5);

    let leaderboardBtn = this.add.image(HALF_WIDTH, GAME_HEIGHT * 0.75, ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.LEADERBOARD_BUTTON);
    leaderboardBtn.setInteractive().on("pointerdown", this.OnLeaderboardClicked, this);

    this.gameOverContainer.add([blackPanel, gameOverImage, this.ScoreText, leaderboardBtn]);
    this.gameOverContainer.setVisible(false);

    this.correctSound = this.sound.add(ASSET_PATH.SOUND.CORRECT.KEY);
    this.wrongSound = this.sound.add(ASSET_PATH.SOUND.WRONG.KEY);
    this.clockSound = this.sound.add(ASSET_PATH.SOUND.CLOCK.KEY);
    this.gameOverSound = this.sound.add(ASSET_PATH.SOUND.GAMEOVER.KEY);
    this.NextQuestionSound = this.sound.add(ASSET_PATH.SOUND.QUESTION.KEY);
  }

  OnLeaderboardClicked() {
    window.open(this.QuestionData.Link, "_self");
  }

  OnPlayClicked() {
    this.score = 0;
    this.menuContainer.setVisible(false);
    this.gameOverContainer.setVisible(false);
    this.Questions = this.GenerateQuestions();
    this.gameContainer.setVisible(true);
    this.TimeDelay = this.QuestionData.Time / 10;
    this.gameOverSound.stop();
    this.NextQuestion();
  }

  NextQuestion() {
    this.NextQuestionSound.play();
    this.clockSound.play();
    if ((this, this.timeEvent)) this.timeEvent.remove();
    for (let i = 0; i < this.Options.length; ++i) {
      let option: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>this.Options.getAt(i);
      option.setTexture(ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.OPTIONS_1);
    }
    this.currentQuestion = this.Questions.pop();
    if (this.currentQuestion != null) {
      this.QuestionText.setText(this.currentQuestion.QuestionTitle);
      this.StartTimer();
      for (let i = 0; i < this.Options.length; ++i) {
        if (i < this.currentQuestion.Options.length) {
          let option: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>this.Options.getAt(i);
          option.setVisible(true);
          let optionText: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>this.OptionsText.getAt(i);
          optionText.setText(this.currentQuestion.Options[i]);
          optionText.setVisible(true);
        } else {
          let option: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>this.Options.getAt(i);
          option.setVisible(false);
          let optionText: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>this.OptionsText.getAt(i);
          optionText.setVisible(false);
        }
      }
    } else {
      this.ScoreText.setText(this.score.toString());
      this.gameOverContainer.setVisible(true);
      this.clockSound.stop();
      this.gameOverSound.play();
      APIManager.GetInstance().sendData(this.score);
    }
  }

  GenerateQuestions(): QuestionModule.Question[] {
    let questions: QuestionModule.Question[] = [];
    for (let i = 0; i < this.QuestionData.TotalQuestion; ++i) {
      let currentQuestion: QuestionModule.Question = this.GetRandomQuestion();
      while (questions.findIndex((Object) => Object == currentQuestion) != -1) {
        currentQuestion = this.GetRandomQuestion();
      }
      questions.push(currentQuestion);
    }
    return questions;
  }

  GetRandomQuestion(): QuestionModule.Question {
    return this.QuestionData.Questions[Phaser.Math.Between(0, this.QuestionData.Questions.length - 1)];
  }

  OnClickOption(option: number) {
    this.timeEvent.remove();
    let optionImage: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>this.Options.getAt(option - 1);
    if (this.currentQuestion.Answer == option) {
      optionImage.setTexture(ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.GREEN_BUTTON);
      this.score += this.QuestionData.ScorePerQuestion;
      this.correctSound.play();
    } else {
      optionImage.setTexture(ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.RED_BUTTON);
      //this.ShowCurrentAnswer();
      this.wrongSound.play();
    }
    this.clockSound.stop();
    this.time.delayedCall(
      1000,
      () => {
        this.NextQuestion();
      },
      null,
      this
    );
  }

  LoadNextQuestion() {
    this.time.delayedCall(
      this.QuestionData.NextQuestionDelay * 1000,
      () => {
        this.NextQuestion();
      },
      null,
      this
    );
    this.NextQuestionIndex = 0;
    this.timeEvent = this.time.delayedCall(1000, this.UpdateNextQuestionTIme, null, this);
  }
  UpdateNextQuestionTIme() {
    if (this.NextQuestionIndex < this.QuestionData.NextQuestionDelay) {
      this.NextQuestionIndex++;
      let timeToShow = this.QuestionData.NextQuestionDelay - this.NextQuestionIndex;
      this.TimeText.setText(timeToShow.toString());
      this.nextQuestionTimeEvent = this.time.delayedCall(1000, this.UpdateNextQuestionTIme, null, this);
    } else {
      this.nextQuestionTimeEvent.remove();
    }
  }

  StartTimer() {
    this.timeIndex = 1;
    let timeToShow = this.QuestionData.Time - (this.timeIndex - 1) * this.TimeDelay;
    this.TimeText.setText(timeToShow.toString());
    if (this.timeEvent) this.timeEvent.remove();
    this.timeEvent = this.time.delayedCall(this.TimeDelay * 1000, this.UpdateTimer, null, this);
  }
  UpdateTimer(arg0: number, scope: any) {
    this.timeIndex++;
    if (this.timeIndex < 12) {
      let text = this.timeIndex < 10 ? "0" + this.timeIndex + ".png" : this.timeIndex + ".png";
      this.TimerSprite.setTexture(ASSET_PATH.MAIN_ASSETS.KEY, ASSET_PATH.MAIN_ASSETS.SPRITES.TIMER_PREFIX + text);
      let timeToShow = this.QuestionData.Time - (this.timeIndex - 1) * this.TimeDelay;
      this.TimeText.setText(timeToShow.toString());
      this.timeEvent = this.time.delayedCall(this.TimeDelay * 1000, this.UpdateTimer, null, this);
    } else {
      this.clockSound.stop();
      this.timeEvent.remove();
      //this.ShowCurrentAnswer();
      this.LoadNextQuestion();
    }
  }
  ShowCurrentAnswer() {
    // let optionImage: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>(
    //   this.Options.getAt(this.currentQuestion.Answer - 1)
    // );
    // optionImage.setTexture(
    //   ASSET_PATH.MAIN_ASSETS.KEY,
    //   ASSET_PATH.MAIN_ASSETS.SPRITES.GREEN_BUTTON
    // );
  }
}
