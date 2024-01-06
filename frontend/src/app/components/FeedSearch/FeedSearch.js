import Image from "next/image";
import styles from './FeedSearch.css'

const FeedSearch = () => {
    return (
        <>
            <div className={styles.searchWrapper}>
                <label className={styles.searchIcon} htmlFor="search">
                    <Image
                        src="/search.svg"
                        alt="search"
                    />
                </label>
                <input id="search" type="text" className={styles.search} placeholder="Поиск"/>
            </div>
        </>
    );
}

export default FeedSearch;