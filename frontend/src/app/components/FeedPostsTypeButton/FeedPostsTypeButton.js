import './FeedPostsTypeButton.css';

const FeedPostsTypeButton = ({ pressed, text }) => {
    const pressedStyle = {
        fontWeight: pressed ? '700' : '400'
    };

    return (
        <>
            <div className='feedPostsType-button-wrapper'>
                <button className="feedPostsType-button" style={pressedStyle}>{text}</button>
            </div>
        </>
    );
}

export default FeedPostsTypeButton;