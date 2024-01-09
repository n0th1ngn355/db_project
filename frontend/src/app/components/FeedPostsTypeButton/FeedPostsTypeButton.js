import './FeedPostsTypeButton.css';

const FeedPostsTypeButton = ({ pressed, text, onClick }) => {
    const pressedStyle = {
        fontWeight: pressed ? '700' : '400'
    };

    return (
        <>
            <div className='feedPostsType-button-wrapper'>
                <button className="feedPostsType-button" onClick={onClick} style={pressedStyle}>{text}</button>
            </div>
        </>
    );
}

export default FeedPostsTypeButton;