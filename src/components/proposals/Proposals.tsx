import { ProposalEntityWithWrite, UserEntity } from '../../../ForFable-Domain';
import WriteDetails from "../../components/write/WriteDetails";
import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify';
import { stringifyAppError } from "../../utils/error";
import { useNavigate } from 'react-router-dom'
import './Proposal.css'
import { ServicesContext } from '../../contexts/ServicesContext';

interface Props {
    proposalId: number
}

const Proposal: React.FC<Props> = ({ proposalId }) => {
    const [proposalUser, setProposalUser] = useState<UserEntity|null>(null)
    const [proposal, setProposal] = useState<ProposalEntityWithWrite|null>(null)
    const navigate = useNavigate()
  const { ProposalsService, ReactWritesService } = useContext(ServicesContext)

    useEffect(()=>{
        const loadUser = async () => {
            const request = await ProposalsService.getAuthor(Number(proposalId))
            if (request.state == 'Failure') {
                toast.error(stringifyAppError(request))
            } else {
                setProposalUser(request.data)
            }
        }
        const loadProposal = async () => {
            const request = await ProposalsService.show(Number(proposalId))
            if (request.state == 'Failure') {
                toast.error(stringifyAppError(request))
            } else {
                request.data.currentHistoryText = 'Era uma vez' // @
                setProposal(request.data)
            }
        }
        Promise.all([loadUser(), loadProposal()])
    },[proposalId, ProposalsService, ReactWritesService])

    if(!proposalUser || !proposal) { return <div> Loading... </div> }

    const gotoAuthor = () => {
        navigate(`/user/${proposalUser.id}`)
    }
      
    return (
        <WriteDetails
            user={proposalUser}
            writeProp={{type: 'Proposal', write: proposal}}
            write={proposal.write}
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