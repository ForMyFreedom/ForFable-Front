import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaginationData, PromptEntity } from '../../../ForFable-Domain';
import './History.css';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ServicesContext } from 'src/contexts/ServicesContext';

interface HistoryProps {
}

const History: React.FC<HistoryProps> = () => {
  const [prompts, setPrompts] = useState<PaginationData<PromptEntity>>()
  const [lang] = useContext(LanguageContext)
  const { PromptsService } = useContext(ServicesContext)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([PromptsService.index()]).then(([prompts]) => {
      if(prompts.state === 'Sucess') {
        setPrompts(prompts.data)
      }
    })
  }, [PromptsService])

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