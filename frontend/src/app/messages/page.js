import Sidebar from "@/app/components/Sidebar/sidebar";
import Image from "next/image";
import './messages.css';


export default function Messages() {
    return (
        <div className="container my-5">
            <div className="row">
                <Sidebar info="messages"/>
                <div className="col mx-3">
                    <div className='row'>
                        <div className="col chat-container">
                            <div className="row-1 chat-content-header">
                                <div className="chat-user-info-wrapper">
                                    <Image className="chat-user-avatar" src="/avatar.svg" alt="avatar" width={36}
                                           height={36}/>
                                    <h2 className="chat-user-name">Джо Байден</h2>
                                </div>
                            </div>
                            <div className="row-1 chat-content">
                                <p></p>
                            </div>
                            <div className="row-1 chat-message-enter">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad blanditiis
                                    consequuntur dolorum, expedita fuga natus obcaecati quae, quidem rerum voluptas
                                    voluptate. A cumque harum natus nihil reiciendis, unde velit.</p>
                            </div>
                        </div>
                        <div className="col-3 chat-list-container">
                            <div className="row-1 chat-content-header">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem
                                    consequuntur
                                    expedita libero nihil nostrum quis quod? Blanditiis, delectus dicta ea enim error
                                    eveniet,
                                    ipsam, neque perspiciatis porro quae recusandae.</p>
                            </div>
                            <div className="row-1 chat-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem
                                    consequuntur
                                    expedita libero nihil nostrum quis quod? Blanditiis, delectus dicta ea enim error
                                    eveniet,
                                    ipsam, neque perspiciatis porro quae recusandae.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}