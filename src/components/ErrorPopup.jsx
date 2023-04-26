import styles from './ErrorPopup.module.scss'

export default function ErrorPopup({ message, confirmCb }) {
  return (
    <div className={styles['popup']}>
      <div className={styles['popup__overlay']}></div>
      <div className={styles['popup__content']}>
        <p>{message}</p>
        <button
          onClick={confirmCb}
          id="popup-confirm">
          확인
        </button>
      </div>
    </div>
  )
}
