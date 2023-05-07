declare module QuestionModule {
  export interface Question {
    QuestionTitle: string;
    Options: string[];
    Answer: number;
  }

  export interface Data {
    Time: number;
    ScorePerQuestion: number;
    TotalQuestion: number;
    Link: string;
    NextQuestionDelay: number;
    Questions: Question[];
  }
}
