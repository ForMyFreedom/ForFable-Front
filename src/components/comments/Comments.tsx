import { useContext, useState } from 'react';
import { CommentsController, CommentsWithAnswers, ReactCommentsController, UserEntity, WriteEntity } from '../../../ForFable-Domain';
import './Comments.css';
import { LanguageContext } from '../../contexts/LanguageContext';
import Paginator from '../paginator/Paginator';
import SingleComment from './SingleComment';

interface CommentsProps {
  appUser: UserEntity|undefined
  writeId: WriteEntity['id']
  commentService: CommentsController
  reactCommentService: ReactCommentsController
}

const Comments: React.FC<CommentsProps> = ({ appUser, writeId, commentService, reactCommentService }) => {
  const [lang] = useContext(LanguageContext)
  const [amountOfComments, setAmountOfComments] = useState<number>(0)
  const [,stateRefresher] = useState<number>(0)

  return (
    <div className="comments">
      <Paginator<CommentsWithAnswers, { users: UserEntity[] }>
          indexFunction={async(page: number) => {
            const response = await commentService.indexByWrite(writeId, page)
            if(response.state=='Sucess'){
              setAmountOfComments(response.data.all.length)
              response.data.all = response.data.all.sort((a, b) => b.id - a.id)
            }
            return response
          }}
          renderAll={(allComments) => {
            return (
            <ul className='comment-list'>
              {
                allComments?.all?.map((comment, index) =>{
                  const user = allComments.users.find((user) => user.id === comment.authorId)
                  if(!user) {return <></>}
                  return (
                    <SingleComment
                      writeId={writeId}
                      reactCommentService={reactCommentService}
                      commentData={comment}
                      user={user}
                      allUsers={allComments.users}
                      key={index}
                      appUser={appUser}
                      stateRefresher={stateRefresher}
                    />
                )})
              }
            </ul>
          )}}
          title={<h1>{amountOfComments} {lang.Comments}</h1>}
          noDataMessage={lang.NoComments}
      />
    </div>
  );
}

export default Comments;