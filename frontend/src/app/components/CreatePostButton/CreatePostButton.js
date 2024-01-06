import './CreatePostButton.css'
import Image from "next/image";

const CreatePostButton = ({ text }) => {
    return (
        <div>
            
            <button className="button">
                <Image 
                    src='/CreatePostButton.svg'
                    width={24}
                    height={24} style='margin-right: 10px'
                />
                {text}
            </button>
        </div>
    );
};

export default CreatePostButton;
