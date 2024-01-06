import Image from "next/image";
import './FeedSearch.css'

const FeedSearch = () => {
    return (
        <>
            <div className="searchWrapper">
                <label className="searchIcon" htmlFor="search">
                    <Image
                        src="/search.svg"
                        alt="search"
                        width={20}
                        height={20}
                    />
                </label>
                <input id="search" type="text" className="search" placeholder="Поиск"/>
            </div>
        </>
    );
}

export default FeedSearch;
