import { useEffect, useState, useContext } from 'react';
import { GenresController, Pagination, PromptEntity, PromptsController } from '../../../ForFable-Domain';
import './History.css';
import { LanguageContext } from '../../contexts/LanguageContext';

interface HistoryProps {
  genresServices: GenresController
  promptServices: PromptsController
}

const History: React.FC<HistoryProps> = ({promptServices}) => {
  const [prompts, setPrompts] = useState<Pagination<PromptEntity>['data']>()
  const [lang] = useContext(LanguageContext)

  useEffect(() => {
    Promise.all([promptServices.index()]).then(([prompts]) => {
      console.log(prompts)
      setPrompts(prompts.data)
    })
  }, [promptServices])

  function gotoPrompt(id: number){
    window.location.href = `/prompt/${id}`
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