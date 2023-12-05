import { useState, useContext } from "react";
import { UserEntity } from "../../../ForFable-Domain";
import { NO_USER_IMAGE } from "../../utils/default";
import { useNavigate } from "react-router-dom";
import Picker from '@emoji-mart/react'
import { ServicesContext } from "../../contexts/ServicesContext";


interface Props {
    writeId: number
    answerToId: number|null
    user: UserEntity
    reloadComments: ()=>void
    setIsResponseOpen: (v: boolean)=>void
    isEdition?: false|{commentId: number, finish: ()=>void}
    standartText?: string
}

const InsertComment: React.FC<Props> = ({ user, writeId, answerToId, reloadComments, setIsResponseOpen, isEdition = false, standartText = '' }) => {
  const navigate = useNavigate()
  const [isFocused, setIsFocused] = useState(false)
  const [commentText, setCommentText] = useState(standartText)
  const [imageUrl,] = useState('')
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [carretPosition, setCarretPosition] = useState(0)
  const { CommentsService } = useContext(ServicesContext)

  const gotoUser = () => {
    navigate(`/user/${user.id}`)
  }

  const handleEmojiButton = () => {
    setEmojiOpen(prev=>!prev)
  }

  const sendMessage = () => {
    if(isEdition){
        CommentsService.update(isEdition.commentId, {
            text: commentText,
            imageUrl: imageUrl=='' ? null : imageUrl
        })
        isEdition.finish()
    } else{
        CommentsService.store({
            writeId: writeId,
            answerToId: answerToId,
            text: commentText,
            imageUrl: imageUrl=='' ? null : imageUrl
        })
    }

    setCommentText('')
    setIsResponseOpen(false)
    reloadComments()
  }

  return (
    <span className={`info--comment ${!isEdition && 'insert-comment'}`}>
        {!isEdition &&
            <img
                className='small-image-portrait nomb'
                src={user.imageUrl || NO_USER_IMAGE}
                alt="User"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = NO_USER_IMAGE
                }}
                onClick={gotoUser}
            />
        }
        <span className='data--comment2'>
            {!isEdition &&
                <p className='commenter-name'>{user?.name}</p>
            }
            <div
                onFocus={()=>setIsFocused(true)}
                onBlur={(e)=>{
                    if (e.currentTarget.contains(e.relatedTarget as Node)) {
                        return;
                    }
                    setIsFocused(false)
                }}
                className="comment--input"
            >
                <textarea
                    value={commentText}
                    onSelect={(e) => setCarretPosition((e.target as HTMLTextAreaElement).selectionStart)}
                    onChange={(e)=>setCommentText(e.target.value)}
                    className={`${isFocused? 'focused' : 'not-focused'} textarea--comment`}
                    placeholder='Escreva um comentário...'
                />
                {
                    isFocused &&
                    <div className="group-actions--insert-comment">
                        <button>
                            <i className="fas fa-image"></i>
                        </button>
                        <button onClick={handleEmojiButton}>
                            <i className="fas fa-grin-stars i-button"></i>
                        </button>
                        <button onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                }
                {emojiOpen &&
                    <div className="emoji-picker-container">
                        <Picker onEmojiSelect={(a: { native: string; })=>setCommentText(prev=>{
                            setCarretPosition(prev=>prev+2) // @ hum... it's working, but it is sus
                            setEmojiOpen(false)
                            return prev.slice(0, carretPosition)+a.native+prev.slice(carretPosition)
                        })} />
                    </div>
                }
            </div>
        </span>
    </span>
  )
}

export default InsertComment;