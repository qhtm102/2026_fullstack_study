import './MyStyle.css'
import styles from './StyleDemo.module.css'

export default function StyleDemo({variant = 'primary'}) {
    const btnStyle = 
            {
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
           }


    return(
        <>
           <button style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
           }}>
            인라인 스타일이 적용된 버튼</button> 
            <hr />
            <button style={btnStyle}>객체 스타일이 적용된 버튼</button>
            <hr />
            <h1 className="title">
                React 스타일 <span className=' highlight'> 제어 </span>
            </h1>
            <hr />
            <button className={`${styles.btn} ${styles[variant]}`}>
                모듈 스타일이 적용된 버튼
            </button>
        </>
    )
}