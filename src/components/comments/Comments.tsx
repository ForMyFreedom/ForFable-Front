import { useContext } from 'react';
import { CommentsController, EstruturatedCommentsWithAnswers, UserEntity, WriteEntity } from '../../../ForFable-Domain';
import './Comments.css';
import { LanguageContext } from '../../contexts/LanguageContext';
import Paginator from '../paginator/Paginator';
import SingleComment from './SingleComment';

interface CommentsProps {
  writeId: WriteEntity['id']
  commentService: CommentsController
}

const Comments: React.FC<CommentsProps> = ({ writeId, commentService }) => {
  const [lang] = useContext(LanguageContext)

  return (
    <div className="comments">
      <Paginator<EstruturatedCommentsWithAnswers, { users: UserEntity[] }>
          indexFunction={(page: number) => commentService.indexByWrite(writeId, page)}
          renderAll={(allComments) => {return (
            <ul className='comment-list'>
              {
                allComments?.all?.map((comment) =>{
                  const user = allComments.users.find((user) => user.id === comment.comment.authorId)
                  if(!user) {return <></>}
                  return (
                    <SingleComment
                      commentData={comment}
                      user={user}
                      allUsers={allComments.users}
                    />
                )})
              }
            </ul>
          )}}
          title={<h1>{lang.Comments}</h1>}
          noDataMessage={lang.NoComments}
      />
    </div>
  );
}

export default Comments;