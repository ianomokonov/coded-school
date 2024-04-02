import { QuestionAnswerDto, TestDto, TestQuestionDto } from '@api/index';

export interface Test extends TestDto {
    questions: TestQuestion[];
    isChecked?: boolean;
}

export interface TestQuestion extends TestQuestionDto {
    answers: TestAnswer[];
}

export interface TestAnswer extends QuestionAnswerDto {
    isChecked?: boolean;
}
