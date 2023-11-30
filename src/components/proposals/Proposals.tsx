import { CommentsController, ProposalEntityWithWrite, ProposalsController, ReactWritesController, UserEntity } from '../../../ForFable-Domain';
import WriteDetails from "../../components/write/WriteDetails";
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { stringifyAppError } from "../../utils/error";
import { useNavigate } from 'react-router-dom'
import './Proposal.css'

interface Props {
    proposalService: ProposalsController
    reactionsService: ReactWritesController
    commentService: CommentsController
    proposalId: number
}

const Proposal: React.FC<Props> = ({ proposalId, proposalService, reactionsService, commentService }) => {
    const [proposalUser, setProposalUser] = useState<UserEntity|null>(null)
    const [proposal, setProposal] = useState<ProposalEntityWithWrite|null>(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const loadUser = async () => {
            const request = await proposalService.getAuthor(Number(proposalId))
            if (request.state == 'Failure') {
                toast.error(stringifyAppError(request))
            } else {
                setProposalUser(request.data)
            }
        }
        const loadProposal = async () => {
            const request = await proposalService.show(Number(proposalId))
            if (request.state == 'Failure') {
                toast.error(stringifyAppError(request))
            } else {
                request.data.currentHistoryText = 'Era uma vez' // @
                setProposal(request.data)
            }
        }
        Promise.all([loadUser(), loadProposal()])
    },[proposalId, proposalService, reactionsService])

    if(!proposalUser || !proposal) { return <div> Loading... </div> }

    const gotoAuthor = () => {
        navigate(`/user/${proposalUser.id}`)
    }
      
    return (
        <WriteDetails
            user={proposalUser}
            writeProp={{type: 'Proposal', write: proposal}}
            write={proposal.write}
            reactWritesService={reactionsService}
            commentService={commentService}
            exibitionText={
                <div>
                    <p>{proposal.currentHistoryText}
                        <b className='tooltip pointer' onClick={gotoAuthor}>
                            {proposal.write.text}
                            <span className='tooltiptext'>{proposalUser.name}</span>
                        </b>
                    </p>
                </div>
            }
        />
    )
}

export default Proposal