import './CreatePostButton.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";

const CreatePostButton = ({ text, onClick, style}) => {
    return (
        <div>
            <button style={style} onClick={onClick} className="button">
                <Image
                    className="create-post-button-image"
                    src='/CreatePostButton.svg'
                    width={24}
                    height={24}
                    alt='createpost'
                />
                {text}
            </button>
        </div>
    );
};

export default CreatePostButton;
