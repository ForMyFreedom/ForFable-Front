import { EstruturatedCommentsWithAnswers, UserEntity } from '../../../ForFable-Domain';
import './Comments.css';
import { NO_USER_IMAGE } from '../../utils/default';
import Dislike from '../write/components/Dislike';
import Like from '../write/components/Like';
import Complaint from '../write/components/Complaint';
import { useNavigate } from 'react-router-dom';

interface Props {
    commentData: EstruturatedCommentsWithAnswers
    user: UserEntity
    allUsers: UserEntity[]
}

const SingleComment: React.FC<Props> = ({ commentData, user, allUsers }) => {
  const navigate = useNavigate()

  function gotoUser(id: number){
    navigate(`/user/${id}`)
  }
    
  return (
    <li className="comment-element" key={commentData.comment.id}>
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
                <p className='text--comment'>{commentData.comment.text}</p>
            </span>
        </span>
        <span className='actions--comment'>
            <Like
                react={() => {}}
                userReaction={null}
                reactionAmount={0}
            />
            <Dislike
                react={() => {}}
                userReaction={null}
                reactionAmount={0}
            />
            <div className='pointer'>
                <p>Responder</p>
            </div>
            <Complaint
                react={() => {}}
                userReaction={null}
            />
        </span>
        {commentData.answers.length > 0 &&
        <ul className='answers--comments'>
            {commentData.answers.map((answer) => {
                const user = allUsers.find((user) => user.id === answer.authorId)
                if(!user) {return <></>}

                return (
                    <li className="answer-element" key={answer.id}>
                        <SingleComment
                            commentData={answer as EstruturatedCommentsWithAnswers} // @
                            user={user}
                            allUsers={allUsers}
                        />
                    </li>
                )
            })}
        </ul>
        }
    </li>
  )
}

export default SingleComment;