import {  ReactionType } from '../../../../ForFable-Domain';
import { getColorForReactionIcon } from './definitions';


interface Props {
    react(reactionType: ReactionType): void
    userReaction: ReactionType|null
    reactionAmount: number
}

const Like: React.FC<Props> = ({ react, userReaction, reactionAmount }) => {
  return (
    <div style={{display:'flex', alignItems: 'center'}}>
        <i onClick={()=>react(ReactionType.POSITIVE)}
        className="tooltip pointer fa-solid fa-thumbs-up"
        style={{color: getColorForReactionIcon(userReaction, ReactionType.POSITIVE, 'green')}}
        >
        <span className="tooltiptext">Like</span>
        </i>
        <p>{reactionAmount}</p>
    </div>
  )
}

export default Like