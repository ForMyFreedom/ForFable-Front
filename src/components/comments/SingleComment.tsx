import { CommentsWithAnswers, ReactionType, UserEntity, WriteEntity } from '../../../ForFable-Domain';
import './Comments.css';
import { NO_USER_IMAGE } from '../../utils/default';
import Dislike from '../write/components/Dislike';
import Like from '../write/components/Like';
import Complaint from '../write/components/Complaint';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { stringifyAppError } from '../../utils/error';
import { useState, useContext } from 'react';
import InsertComment from './InsertComment';
import { ServicesContext } from '../../contexts/ServicesContext';
import { LanguageContext } from '../../contexts/LanguageContext';

interface Props {
    writeId: WriteEntity['id']
    commentData: CommentsWithAnswers
    appUser: UserEntity|undefined
    user: UserEntity
    allUsers: UserEntity[]
    stateRefresher: React.Dispatch<React.SetStateAction<number>>
}

const SingleComment: React.FC<Props> = ({ writeId, appUser, commentData, user, allUsers, stateRefresher }) => {
  const navigate = useNavigate()
  const { CommentsService, ReactCommentsService } = useContext(ServicesContext)
  const [lang] = useContext(LanguageContext)

  const [isResponseOpen, setIsResponseOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const reactionToThatComment = commentData.reactions.find(r => r.userId === appUser?.id)?.type

  function gotoUser(id: number){
    navigate(`/user/${id}`)
  }

  const reactToComment = async (commentId: number, reactionType: ReactionType) => {
    const response = await ReactCommentsService.store({commentId: commentId, type: reactionType})
    if(response.state === 'Failure'){
        toast.error(stringifyAppError(response))
    } else {
        stateRefresher(prev=>prev+1)
    }
  }

  const removeComment = () => {
    CommentsService.destroy(commentData.id)
    stateRefresher(prev=>prev+1)
  }

  return (
    <li className="comment-element" key={commentData.id}>
        <span className='info--comment'>
            <img
                className='small-image-portrait nomb'
                src={user.imageUrl || NO_USER_IMAGE}
                alt="User"
                onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = NO_USER_IMAGE
                }}
                onClick={()=>gotoUser(user.id)}
            />
            <span className='data--comment'>
                <p className='commenter-name'>{user?.name}</p>
                <p className='inline ml-5'>
                    {(new Date(String(commentData.createdAt))).toLocaleString(lang.LOCALE_DATE_STRING)}
                </p>
                {commentData.edited &&  <i className='ml-2'>(Editado)</i> }
                {isEditing && appUser ?
                    <InsertComment
                        writeId={writeId}
                        answerToId={commentData.id}
                        user={appUser}
                        reloadComments={()=>stateRefresher(prev=>prev+1)}
                        setIsResponseOpen={()=>{}}
                        isEdition={{commentId: commentData.id, finish: ()=>setIsEditing(false)}}
                        standartText={commentData.text}
                    />
                    :
                    <p className='text--comment'>{commentData.text}</p>
                }
            </span>
        </span>
        {commentData.imageUrl &&
            <img className='image--comment'
                src={commentData.imageUrl}
            />
        }
        <span className='actions--comment'>
            {appUser?.id !== commentData.authorId ?
                <>
                    <Like
                        react={()=>reactToComment(commentData.id, ReactionType.POSITIVE)}
                        userReaction={reactionToThatComment ?? null}
                        reactionAmount={commentData.reactions.filter(r => r.type === 'POSITIVE').length}
                    />
                    <Dislike
                        react={()=>reactToComment(commentData.id, ReactionType.NEGATIVE)}
                        userReaction={reactionToThatComment ?? null}
                        reactionAmount={commentData.reactions.filter(r => r.type === 'NEGATIVE').length}
                    />
                    <Complaint
                        react={()=>reactToComment(commentData.id, ReactionType.COMPLAINT)}
                        userReaction={reactionToThatComment ?? null}
                    />
                </> :
                <>
                    <div onClick={()=>setIsEditing(prev=>!prev)} className='pointer'>
                        <p>Editar</p>
                    </div>
                    <div onClick={removeComment} className='pointer'>
                        <p>Remover</p>
                    </div>  
                </>
            }
            <div onClick={()=>setIsResponseOpen(prev=>!prev)} className='pointer'>
                <p>Responder</p>
            </div>
        </span>
        {(isResponseOpen && appUser) &&
            <div>
                <InsertComment
                    user={appUser} writeId={writeId} answerToId={commentData.id}
                    reloadComments={()=>stateRefresher(prev=>prev+1)}
                    setIsResponseOpen={setIsResponseOpen}
                />
            </div>
        }
        {commentData.answers.length > 0 &&
        <ul className='answers--comments'>
            {commentData.answers.map((answer) => {
                const user = allUsers.find((user) => user.id === answer.authorId)
                if(!user) {return <></>}
                return (
                    <ul className="answer-element" key={answer.id}>
                        <SingleComment
                            writeId={writeId}
                            commentData={answer as CommentsWithAnswers} // @
                            user={user}
                            allUsers={allUsers}
                            appUser={appUser}
                            stateRefresher={stateRefresher}
                        />
                    </ul>
                )
            })}
        </ul>
        }
    </li>
  )
}

export default SingleComment;