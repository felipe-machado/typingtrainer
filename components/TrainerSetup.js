import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ParagraphTextarea, TimeLimitSelect, OtherTimeLimitInput } from './inputs';

export function TrainerSetup({setTimeLimit, timeLimit, setParagraph, setStartDate, setTraining, otherTimeLimit, paragraph, setTimerActive, setOtherTimeLimit}) {
    // Starts trainer
    function startTrainer() {
        let countdownTimeLimit = timeLimit;
        if (timeLimit == -1) {
            setTimeLimit(otherTimeLimit);
            countdownTimeLimit = otherTimeLimit
        }
        setParagraph(paragraph.trim())
        setStartDate(Date.now() + (countdownTimeLimit * 1000));
        setTimerActive(true);
        setTraining(true);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title key="title">TypingTrainer Setup</title>
                <link key="favicon" rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <span>TypingTrainer</span>
                </h1>
                <div className={styles.card}>
                    <h2 className={styles.description}>
                        Get started by editing your config
                    </h2>

                    <div className={styles.grid}>
                        <form>
                            <div>
                                <label>Paragraph</label>
                            </div>
                            <div>
                                <ParagraphTextarea paragraph={paragraph} setParagraph={setParagraph}></ParagraphTextarea>
                            </div>
                            <div>
                                <label>Time(seconds)</label>
                            </div>
                            <div>
                                <TimeLimitSelect key="timeSelect" setTimeLimit={setTimeLimit} timeLimit></TimeLimitSelect>
                                {
                                    timeLimit == -1 && <OtherTimeLimitInput key="otherInput" setOtherTimeLimit={setOtherTimeLimit} value={otherTimeLimit}></OtherTimeLimitInput>
                                }
                            </div>
                            <div className={styles.grid}>
                                <button className="start" onClick={e => startTrainer()}>Start</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}