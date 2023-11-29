import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GenresController, PaginationData, PromptEntity, PromptsController } from '../../../ForFable-Domain';
import './History.css';
import { LanguageContext } from '../../contexts/LanguageContext';

interface HistoryProps {
  genresServices: GenresController
  promptServices: PromptsController
}

const History: React.FC<HistoryProps> = ({promptServices}) => {
  const [prompts, setPrompts] = useState<PaginationData<PromptEntity>>()
  const [lang] = useContext(LanguageContext)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([promptServices.index()]).then(([prompts]) => {
      if(prompts.state === 'Sucess') {
        setPrompts(prompts.data)
      }
    })
  }, [promptServices])

  function gotoPrompt(id: number){
    navigate(`/prompt/${id}`)
  }

  return (
    <div className="history">
      <h1>{lang.OnceUponATime}</h1>
      <ul className='prompt-list'>
        {prompts?.all?.map((prompt) => (
          <li className="prompt-element" key={prompt.id} onClick={()=>gotoPrompt(prompt.id)}>
            <h3>{prompt.title}</h3>
            <p>{prompt.historyText}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;