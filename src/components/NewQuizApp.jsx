import { useEffect, useReducer } from "react";
import './quiz.css'
import Header from "./QuizApp/Header";
import Main from "./QuizApp/Main";
import Loader from "./QuizApp/Loader";
import Error from "./QuizApp/Error";
import StartScreen from "./QuizApp/StartScreen";
import Question from "./QuizApp/Question";
import NextButton from "./QuizApp/NextButton";
import Progress from "./QuizApp/Progress";
import FinishScreen from "./QuizApp/FinishScreen";
import Footer from "./QuizApp/Footer";
import Timer from "./QuizApp/Timer";
import { generateQuizData } from './GenerateQuizData';
import TopicQues from "./QuizApp/TopicQues";
const SECS_PER_QUESTION = 15;

// We need to define the intialState in order to use useReduce Hook.
const initialState = {
  topic:null,
  nofQues:null,
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "getTopic",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "topicQuestion":
      return{
        ...state,
        topic:action.payload.topic,
        nofQues:action.payload.nofQues,
        status:"loading",
      };
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        highscore:
          state.secondsRemaining === 0
            ? state.points > state.highscore
              ? state.points
              : state.highscore
            : state.highscore,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkonwn");
  }
}

export default function NewQuizApp() {
  const [
    { topic,nofQues,questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
 
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  const fetchData = async () => {
    try {
      const data = await generateQuizData(topic,nofQues);
      console.log(data);
      
      dispatch({
        type: "dataReceived",
        payload: data["questions"],
      })
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  };
  useEffect(()=>{
    window.scrollTo(0, document.body.scrollHeight);
  },[]);

  useEffect(()=>{
    if(topic&&nofQues){
      window.scrollTo(0, document.body.scrollHeight);
      fetchData();
    }
  },[topic,nofQues]);
  return (
    <div className="flex justify-center items-center min-h-screen p-0 sm:p-4  pt-0"  style={{color: '#f1f3f5', 
     backgroundColor: '#343a40', 
    }}>
      <div className="flex flex-col justify-center items-center " 
      style={{width: '100vw',position: 'relative',}}
      >
        <div className="headerWrapper mt-10 w-full">
          <Header />

          <Main>
            {status === "getTopic" && <TopicQues dispatch={dispatch}/>}
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && (
              <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
            )}{" "}
            {status === "active" && (
              <>
                <Progress
                  index={index}
                  numQuestions={numQuestions}
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  answer={answer}
                />
                <Question
                  question={questions[index]}
                  dispatch={dispatch}
                  answer={answer}
                />
                <Footer>
                  <Timer
                    dispatch={dispatch}
                    secondsRemaining={secondsRemaining}
                  />
                  <NextButton
                    dispatch={dispatch}
                    answer={answer}
                    numQuestions={numQuestions}
                    index={index}
                  />
                </Footer>
              </>
            )}
            {status === "finished" && (
              <FinishScreen
                topic = {topic}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                highscore={highscore}
                dispatch={dispatch}
              />
            )}
          </Main>
        </div>
      </div>
    </div>
  );
}