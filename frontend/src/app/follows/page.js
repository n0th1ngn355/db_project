import 'bootstrap/dist/css/bootstrap.css'
import './follows.css'
import Sidebar from "@/app/components/Sidebar/sidebar";
import FollowsSearch from "@/app/components/FollowsSearch/FollowsSearch";
import FollowingFollowerBlock from "@/app/components/FollowingFollowerBlock/FollowingFollowerBlock";

export default function Follows() {
    return (
        <>
            <div className="container my-5">
                <div className='row'>
                    <Sidebar info="follows"/>
                    <div className='col mx-3'>
                        <div className="row follows-containter">
                            <div className="col following">
                                <div className="search-wrapper">
                                    <h1 className="title-style">Ваши подписки</h1>
                                    <FollowsSearch></FollowsSearch>
                                </div>
                                <div className="followings-list">
                                    <FollowingFollowerBlock type="following" name="Билл Клинтон" desc="Я профессиональный c++ разраб наймите меня пж"></FollowingFollowerBlock>
                                </div>
                            </div>
                            <div className="col-4 followers">
                                <div className="wrapper">
                                    <div className="search-wrapper">
                                        <h1 className="title-style">Ваши подписчики</h1>
                                        <FollowsSearch></FollowsSearch>
                                    </div>
                                </div>
                                <div className="followers-list">
                                    <FollowingFollowerBlock name="Билл Клинтон"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Николай Морозов"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Бичуган Гагунов"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Николай Морозов"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Бичуган Гагунов"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Николай Морозов"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Бичуган Гагунов"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Николай Морозов"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Бичуган Гагунов"></FollowingFollowerBlock>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

