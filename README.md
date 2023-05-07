# Simple Quiz using Phaser 3 and Webpack

This is a simple quiz application developed using Phaser 3 and Webpack. All the questions for the quiz are loaded from a JSON file which can be fetched from the server. The quiz consists of multiple choice questions with one correct answer for each question.

## Installation

To install the application, clone the repository and install the dependencies using npm:

```
git clone https://github.com/NitinParmar7/Quiz.git
cd quiz
npm install
```

## Usage

To start the application, run the following command:

```
npm start
```

This will start a development server at `http://localhost:8080`. You can access the application by navigating to this URL in your web browser.

Once you start the quiz, you will be presented with a series of multiple choice questions. Answer all the questions and submit your answers to see your score. Your score will be added to the leaderboard if it is in the top 10 scores.

Modifying Questions

The questions for the quiz are loaded from a JSON file located at src/assets/data/questions.json. To modify the questions, simply edit this file to add, remove, or modify questions.
```

## Building for Production

To build the application for production, run the following command:

```
npm run build
```

This will generate a production build of the application in the `dist` directory.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
