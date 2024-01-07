import Image from "next/image";
import './FollowsSearch.css'

const FollowsSearch = () => {
    return (
        <>
            <div className="search-input-wrapper">
                <label className="search-icon" htmlFor="search">
                    <Image
                        src="/search1.svg"
                        alt="search"
                        width={16}
                        height={16}
                    />
                </label>
                <input id="search" type="text" className="search" placeholder="Поиск"/>
            </div>
        </>
    )
}

export default FollowsSearch;