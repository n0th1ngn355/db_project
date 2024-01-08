import Sidebar from "@/app/components/Sidebar/sidebar";
import MessagesInput from "@/app/components/MessagesInput/MessagesInput";
import MessagesMessage from "@/app/components/MessagesMessage/MessagesMessage";
import MessagesInterlocutor from "@/app/components/MessagesInterlocutor/MessagesInterlocutor";
import MessagesChatInfo from "@/app/components/MessagesChatInfo/MessagesChatInfo";
import Link from "next/link";
import Image from "next/image";
import './messages.css';


export default function Messages() {
    return (
        <div className="container my-5">
            <div className="row">
                <Sidebar info="messages"/>
                <div className="col mx-3 mt-3">
                    <div className='row'>
                        <div className="col chat-container">
                            <div className="chat-content-header">
                                <MessagesChatInfo interlocutorName="Джо Байден"></MessagesChatInfo>
                            </div>
                            <div className="chat-content-wrapper">
                                <div className="chat-content">
                                    <MessagesMessage type="interlocutor" message="Здарова, Бабун."></MessagesMessage>
                                    <MessagesMessage type="interlocutor" message="Короче, сегодня я сходил в бассейн. Не особо понравилось, потому что народу было ОЧЕНЬ много." last={true} messageTime="12:00"></MessagesMessage>
                                    <MessagesMessage message="Блин, отстой. Туда нужно идти с утра, тогда точно никого не будет. Я сам так делаю."></MessagesMessage>
                                    <MessagesMessage message="В общем, сходи потом с утра, потому что иначе я не принимаю твое мнение насчет бассейна." last={true} messageTime="12:01"></MessagesMessage>
                                    <MessagesMessage type="interlocutor" message="Ишь чего захотел, без тебя не пойду никуда. Сам покажешь, что там 'никого не будет'"></MessagesMessage>
                                    <MessagesMessage type="interlocutor" message="Ты слышал, кстати, что скоро новая ГТА выйдет? Недавно трейлер выпустили." last={true} messageTime="12:05"></MessagesMessage>
                                    <MessagesMessage message="Нет, не слышал. Потом как-нибудь гляну."></MessagesMessage>
                                    <MessagesMessage message="В общем, сходи потом с утра, потому что иначе я не принимаю твое мнение насчет бассейна." last={true} messageTime="12:07"></MessagesMessage>
                                </div>
                            </div>
                            <div className="chat-message-input">
                                {/*<div className="chat-message-input-attach-buttons">*/}
                                {/*    <button className="chat-message-attach-button">*/}
                                {/*        <Image src="/uploadimage.svg" alt="uploadimage" width={24} height={25}/>*/}
                                {/*    </button>*/}
                                {/*    <button className="chat-message-attach-button">*/}
                                {/*        <Image src="/uploadfile.svg" alt="uploadfile" width={24} height={25}/>*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                                <MessagesInput></MessagesInput>
                                <div className="chat-message-input-send-button">
                                    <button className="chat-message-send-button">
                                        <Image src="/sendmessage.svg" alt="sendmessage" width={24} height={25}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 chat-list-container">
                            <div className="row-1 chat-content-header">
                                <h2 className="chat-list-title">Сообщения</h2>
                            </div>
                            <div className="row-1 chat-list-content">
                                <MessagesInterlocutor name="Джо Байден" opened={true} lastMessage="В общем, сходи потом с утра, потому что иначе я не принимаю твое мнение насчет бассейна." lastMessageDateOrTime="12:01"></MessagesInterlocutor>
                                <MessagesInterlocutor name="Марвин Мерлин" lastMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, voluptatibus!" lastMessageDateOrTime="1 Мая"></MessagesInterlocutor>
                                <MessagesInterlocutor name="Роберт Ховард" lastMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, ratione!" lastMessageDateOrTime="23:12"></MessagesInterlocutor>
                                <MessagesInterlocutor name="Николай Морозов" lastMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, ratione!" lastMessageDateOrTime="2 Июня"></MessagesInterlocutor>
                                <MessagesInterlocutor name="Билл Клинтон" lastMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, ratione!" lastMessageDateOrTime="00:54"></MessagesInterlocutor>
                                <MessagesInterlocutor name="Бичуган Гагунов" lastMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, ratione!" lastMessageDateOrTime="31 Дек"></MessagesInterlocutor>
                                <MessagesInterlocutor name="Алексей Иванов" lastMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, ratione!" lastMessageDateOrTime="01:16"></MessagesInterlocutor>
                                <MessagesInterlocutor name="Григорий Пивоваров" lastMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, ratione!" lastMessageDateOrTime="05:00"></MessagesInterlocutor>
                                <MessagesInterlocutor name="Александр Лукъянов" lastMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, ratione!" lastMessageDateOrTime="12:19"></MessagesInterlocutor>
                                <MessagesInterlocutor name="Гегемон Бурьян" lastMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, ratione!" lastMessageDateOrTime="15 Окт"></MessagesInterlocutor>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}