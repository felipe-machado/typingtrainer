import React, {useState} from 'react'
import styles from '../styles/Home.module.css'

export const timeLimitOptions = [
    { label: '60 (1 minute)', value: 60 },
    { label: '120 (2 minutes)', value: 120 },
    { label: '300 (5 minutes)', value: 300 },
    { label: 'Other', value: -1 },
]

export function OtherTimeLimitInput ({value, setOtherTimeLimit}) {
    return <input type="number" className="other" key="otherInputRaw" placeholder='specify in seconds' defaultValue={value}  onChange={(e) => { setOtherTimeLimit(e.target.value) }}></input>
}

export function TimeLimitSelect ({timeLimit, setTimeLimit}) {
    return (
        <>
            <select className="time-limit" name="time-limit" defaultValue={timeLimit} onChange={ (e) => setTimeLimit(e.target.value) }>
                {
                    timeLimitOptions.map((option, index) => {
                        return <option value={option.value} key={index}>{option.label}</option>
                    })
                }
            </select>
        </>
    )
}

export function ParagraphTextarea ({paragraph, setParagraph}) {
    return <textarea className="paragraph-input" key="paragraphInput" value={paragraph} onChange={(e) => setParagraph(e.target.value)}></textarea>
}

export function TrainingInput ({words, setWords}) {
    const [currentWord, setCurrentWord] = useState('');
    return (<input autoFocus={true} className={styles.input} type="text" value={currentWord} onChange={e => {
        if(e.target.value.trim() == e.target.value) {
            setCurrentWord(e.target.value.trim())
        }
    }} onKeyUp={ (e) => {
        if(((e.key == ' ') || (e.key == 'Enter')) && (e.target.value.trim() != "")) {
            setWords([...words, e.target.value.trim()])
            setCurrentWord('');
        }
    }}></input>)
}