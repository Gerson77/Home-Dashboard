import styles from './css/Loading.module.css'

export function Loading() {
    return (
        <div className={styles.containerLoading}>
            <div className={styles.loading}>
            </div>
        </div>
    )
}