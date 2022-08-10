import React, {useState, useCallback, useRef, useEffect} from 'react'
import randomWords from 'random-words'
import { Trainer } from '../components/Trainer'
import { Results } from '../components/Results'
import { TrainerSetup } from '../components/TrainerSetup'

export default function Home() {

  // Constants
  const [timeLimit, setTimeLimit] = useState(60)
  const [otherTimeLimit, setOtherTimeLimit] = useState(60);
  const [paragraph, setParagraph] = useState("")
  const [training, setTraining] = useState(false)
  const [words, setWords] = useState([])
  const [timerActive, setTimerActive] = useState(false)
  const countdownRef = useRef(null);
  const [elapsed, setElapsed] = useState(0);
  const [startDate, setStartDate] = useState(Date.now())

  // Returns an array of words from the paragraph
  function paragraphWords ()  {
    return paragraph.split(' ');
  }

  // Required effects for startup
  useEffect(() => {
    setParagraph(randomWords({ exactly: 50, join: ' ' }));
  }, [])

  useEffect(() => {
    if((words.length == paragraphWords().length) && (countdownRef.current)) {
      countdownRef.current.getApi().pause()
    }
  },[words, paragraphWords])

  // Returns current score.
  function score() {
    let score = 0;
    paragraphWords().map((word, key) => {
      // Check if words are correct against original paragraph words
      if(words[key] == word)
        score++
    })
    return score;
  }

  // Resets TypingTrainer
  function resetTraining() {
    setTraining(false)
    setWords([]);
    setParagraph(randomWords({ exactly: 50, join: ' ' }))
    setTimeLimit(60);
  }

  // Trainer
  if(training && timerActive)
    return <Trainer timeLimit={timeLimit} score={score()} countdownRef={countdownRef} startDate={startDate} paragraphWords={paragraphWords()} words={words} setWords={setWords} setElapsed={setElapsed} setTimerActive={setTimerActive} ></Trainer>

  // Results
  if(training)
    return <Results score={score()} paragraphWords={paragraphWords()} words={words} elapsed={elapsed} resetTraining={resetTraining}></Results>

  // Setup
  return <TrainerSetup setTimeLimit={setTimeLimit} timeLimit={timeLimit} setParagraph={setParagraph} setStartDate={setStartDate} setTraining={setTraining} otherTimeLimit={otherTimeLimit} paragraph={paragraph} setTimerActive={setTimerActive} setOtherTimeLimit={setOtherTimeLimit} ></TrainerSetup>
}
