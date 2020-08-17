import home from './images/home.png';
import selectedHome from './images/home_blue.png';
import learn from './images/learn.png';
import selectedLearn from './images/learn_blue.png';
import result from './images/result.png';
import selectedResult from './images/result_blue.png';

import settings from './images/setting.png';
import selectedSettings from './images/setting_blue.png';
import exam from './images/exam.svg';
// eslint-disable-next-line import/no-unresolved
import selectedExam from './images/exam_blue.svg';
import coach from './images/coach.svg';
import selectedCoach from './images/coach_blue.svg';

const renderLearn = learn;

const renderSelectedLearn = selectedLearn;

const renderResult = result;
const renderSelectedResult = selectedResult;

const renderCoach = coach;
const renderSelectedCoach = selectedCoach;

const renderExam = exam;
const renderSelectedExam = selectedExam;

const renderSettings = settings;
const renderSelectedsettings = selectedSettings;

export const menuConfig = {
  home: {
    link: '/',
    img: home,
    selectedImg: selectedHome,
    imgAlt: 'home',
    title: 'HOME',
  },
  learn: {
    pathnameList: ['/my-class'],
    link: '/my-class/learning-progress/course',
    img: renderLearn,
    selectedImg: renderSelectedLearn,
    imgAlt: '학습',
    title: 'My Class',
  },
  result: {
    pathnameList: ['/coaching'],
    link: '/coaching/seeds',
    img: renderResult,
    selectedImg: renderSelectedResult,
    imgAlt: '결과',
    title: 'Coaching',
  },
  setting: {
    pathnameList: ['/setttings'],
    link: '/settings',
    img: renderSettings,
    selectedImg: renderSelectedsettings,
    imgAlt: '세팅',
    title: 'SETTING',
  },
  coach: {
    pathnameList: ['/exam-report'],
    link: '/exam-report',
    img: renderCoach,
    selectedImg: renderSelectedCoach,
    imgAlt: '코치',
    title: 'Exam',
  },
  exam: {
    pathnameList: ['/exam', '/exams'],
    link: '/exams',
    img: renderExam,
    selectedImg: renderSelectedExam,
    imgAlt: '시험',
    title: 'Exam',
  },
};
