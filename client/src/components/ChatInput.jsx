import  {useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import  {IoMdSend} from 'react-icons/io'
import  {BsEmojiSmileFill} from 'react-icons/bs'

function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = ( emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length > 0 ){
            handleSendMsg(msg);
            setMsg("");
        }
    }

  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick= {handleEmojiPickerHideShow}/> 
                 {showEmojiPicker && <Picker onEmojiClick={ handleEmojiClick}/>}
            </div>
        </div>
        <form className='input-container' onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder='Type a message' value={msg} onChange={(e) => setMsg(e.target.value)}/>
            <button className="submit">
                <IoMdSend />
            </button>
        </form>
    </Container>
  );
}


const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items: center;
background-color: #080420;
padding: 0 2rem;
padding-bottom: 0.3rem;
@media screen and (min-width: 720px) and (max-width: 1080px){
    padding: 0 1rem;
    gap: 1rem;
}

.button-container {
    display: flex;
    align-items: center;
    color: red;
    gap: 1rem;
    .emoji {
        position: absolute;     
        svg {
            font-size: 1.5rem;
            color: #ffff00c8;
            cursor: pointer;
        }
    
    }

}
aside.EmojiPickerReact.epr-main {
    border-color: var(--epr-picker-border-color);
    border-radius: var(--epr-picker-border-radius);
    border-style: solid;
    border-width: 1px;
    display: flex;
    flex-direction: column;
    position: absolute;
}

.EmojiPickerReact {
    // top: 90px;
    top: -480px;
    background-color: var(--epr-bg-color);
    overflow: hidden;
    background-color: #080420;
    box-shadow: 0 5px 10px #9a86f3;
    border-color: #9186f3;

    .emoji-categories {
        button {
            filter: contrast(0);
        }
    }

}
.EmojiPickerReact .epr-body::-webkit-scrollbar {
        background-color: #080240;
        width: 5px;
        &-thumb {
            background-color: #9186f3;
        }
    }
}

.EmojiPickerReact .epr-search-container input.epr-search {
    background-color: transparent;
    border-color:  #9186f3;
    border-radius: var(--epr-search-input-border-radius);
    color: var(--epr-search-input-text-color);
    height: var(--epr-search-input-height);
    outline: none;
    padding: var(--epr-search-input-padding);
    transition: all .2s ease-in-out;
    width: 100%;
}

.EmojiPickerReact li.epr-emoji-category>.epr-emoji-category-label {
    align-items: center;
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    background-color: #080240;
    color: var(--epr-category-label-text-color);
    display: flex;
    font-weight: 700;
    height: var(--epr-category-label-height);
    padding: var(--epr-category-label-padding);
    position: -webkit-sticky;
    position: sticky;
    text-transform: capitalize;
    top: 0;
    width: 100%;
    z-index: var(--epr-category-label-z-index);
}


.input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
        width: 90%;  
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection {
            background-color: #9186f3;
        }
        &:focus {
            outline: none;
        }
    }
    button {
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: #9a86f3;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            padding: 0.3rem 1rem;
            svg {
                font-size: 1rem;
            }
        }
        svg {
            font-size: 2rem;
            color: white;
        }
    }
}
`;


export default ChatInput

