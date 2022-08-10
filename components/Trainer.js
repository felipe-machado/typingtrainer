import Head from 'next/head'
import Countdown, {zeroPad} from 'react-countdown';
import { TrainingInput } from '../components/inputs';
import styles from '../styles/Home.module.css'


export function Trainer({timeLimit, score, countdownRef, startDate, paragraphWords, words, setWords, setElapsed, setTimerActive}) {
    // Gets called on Countdowns Pause or Complete
    function finishedTraining(props) {
        setElapsed(timeLimit - (props.total / 1000))
        setTimerActive(false);
    }
    // Countdown renderer callback with condition
    const renderer = ({ hours, minutes, seconds }) => {
        return <span>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    };
    return (
        <div className={styles.container}>
            <Head>
                <title key="title">TypingTrainer in Training</title>
                <link key="favicon" rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Start <span>Typing</span>
                </h1>
                <p>Press Space or Enter to continue with next word</p>
                <Countdown zeroPadTime="2" renderer={renderer} key="countdownComp" ref={countdownRef} date={startDate} onComplete={(props) => {
                    finishedTraining(props)
                }} onPause={(props) => {
                    finishedTraining(props)
                }} />
                <div className={styles.card}>
                <h2 className={styles.title}>Score: <span>{score}</span></h2>

                    <p className={styles.paragraph}>
                        { paragraphWords.map((word, key) => {
                            return <span key={key} style={{color: ((words[key] == word) ? 'green' : ((words[key]) ? 'red' : 'orange'))}}>{word} </span>
                        }) }
                    </p>
                </div>
                <TrainingInput words={words} setWords={setWords}></TrainingInput>
            </main>
        </div>
    )
}