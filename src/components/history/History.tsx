import { useEffect, useState } from 'react';
import { GenresController, Pagination, PromptEntity, PromptsController } from '../../../ForFable-Domain';
import './History.css';

interface HistoryProps {
  genresServices: GenresController
  promptServices: PromptsController
}

const History: React.FC<HistoryProps> = ({promptServices}) => {
  const [prompts, setPrompts] = useState<Pagination<PromptEntity>['data']>()

  useEffect(() => {
    Promise.all([promptServices.index()]).then(([prompts]) => {
      console.log(prompts)
      setPrompts(prompts.data)
    })
  }, [promptServices])

  return (
    <div className="history">
      <h1>Era uma vez...</h1>
      <ul className='prompt-list'>
        {prompts?.all?.map((prompt) => (
          <li className="prompt-element" key={prompt.id}>
            <h3>{prompt.title}</h3>
            <p>{prompt.historyText}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;