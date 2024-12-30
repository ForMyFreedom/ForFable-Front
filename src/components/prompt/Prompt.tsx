import { PromptEntityWithWrite, PromptTrail, UserEntity } from '../../../ForFable-Domain';
import WriteDetails from "../write/WriteDetails";
import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify';
import { stringifyAppError } from "../../utils/error";
import { useNavigate } from 'react-router-dom'
import './Prompt.css'
import { ServicesContext } from '../../contexts/ServicesContext';

interface Props {
    promptId: number
}

const Prompt: React.FC<Props> = ({ promptId }) => {
    const [promptUser, setPromptUser] = useState<UserEntity|null>(null)
    const [prompt, setPrompt] = useState<PromptEntityWithWrite|null>(null)
    const [definitives, setDefinitives] = useState<PromptTrail>([])
    const navigate = useNavigate()
    const { PromptsService } = useContext(ServicesContext)

    useEffect(()=>{
        const loadUser = async () => {
            const request = await PromptsService.getAuthor(Number(promptId))
            if (request.state == 'Failure') {
                toast.error(stringifyAppError(request))
            } else {
                setPromptUser(request.data)
            }
        }

        const loadPrompt = async () => {
            const request = await PromptsService.show(Number(promptId))
            if (request.state == 'Failure') {
                toast.error(stringifyAppError(request))
            } else {
                setPrompt(request.data)
            }
        }

        const loadDefinitives = async () => {
            const request = await PromptsService.trailDefinitives(Number(promptId))
            if (request.state == 'Failure') {
                toast.error(stringifyAppError(request))
            } else {
                setDefinitives(request.data)
            }
        }
        Promise.all([loadUser(), loadPrompt(), loadDefinitives()])
    },[PromptsService, promptId])

    if(!promptUser || !prompt) { return <div> Loading... </div> }

    const gotoProposal = (id: number|null) => {
        if(id){
            navigate(`/proposal/${id}`)
        }
    }
      
    return (
        <WriteDetails
            user={promptUser}
            writeProp={{type: 'Prompt', write: prompt}}
            write={prompt.write}
            exibitionText={
                <div className='definitives--prompts'>
                    {definitives.map((definitive, index) => (
                        <p onClick={()=>gotoProposal(definitive.proposalId)}
                        className="tooltip pointer"
                        >
                            {definitive.proposalText}
                            <span className="tooltiptext" key={index}>{definitive.userName}</span>
                        </p>
                    ))}
                </div>
            }
        />
    )
}

export default Prompt