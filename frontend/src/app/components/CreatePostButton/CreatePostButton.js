import './CreatePostButton.css'
import Image from "next/image";

const CreatePostButton = ({ text }) => {
    return (
        <div>
            
            <button className="button">
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
