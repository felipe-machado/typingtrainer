import Head from 'next/head'
import styles from '../styles/Home.module.css'


export function Results({score, paragraphWords, words, elapsed, resetTraining}) {
    return (
        <div className={styles.container}>
            <Head>
                <title key="title">TypingTrainer Results</title>
                <link key="favicon" rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                Final Score: <span>{score} / {paragraphWords.length} ({(score/paragraphWords.length)*100}%)</span>
                </h1>
                <small>{ elapsed } seconds elapsed ({ (Math.round((words.length / elapsed) * 100) / 100) } wps)</small>
                <div className={styles.card}>
                    <h2>Original Paragraph</h2>
                    <p className={styles.paragraph}>
                    { paragraphWords.map((word, key) => {
                        return <span key={key} style={{color: ((words[key] == word) ? 'green' : ((words[key]) ? 'red' : 'orange'))}}>{word} </span>
                    }) }
                    </p>
                </div>
                <div className={styles.card}>
                    <h2>You Wrote</h2>
                    <p className={styles.paragraph}>
                    { words.map((word, key) => {
                        return <span key={key} style={{color: ((paragraphWords[key] == word) ? 'green' : ((paragraphWords[key]) ? 'red' : 'orange'))}}>{word} </span>
                    }) }
                    </p>
                </div>
                <div className={styles.grid}>
                    <button onClick={e => resetTraining()}>Reset</button>
                </div>
            </main>
        </div>
    )
}