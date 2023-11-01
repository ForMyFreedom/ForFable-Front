import './UsersList.css';
import { useEffect, useState } from 'react';
import { Pagination, UserEntity, UsersUsecase } from '../../for-fable-domain';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  userService: UsersUsecase
}

const MAX_BUTTONS = 4;

const UsersList: React.FC<UserProps> = ({ userService }) => {
  const navigate = useNavigate()
  const [allUsers, setAllUsers] = useState<Pagination<UserEntity>|undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
        setIsLoading(true)
        const response = await userService.index(currentPage)
        if (response.data) {
            setAllUsers(response.data)
        }
        setIsLoading(false)

    }

    loadUser()
  }, [userService, currentPage])


  const gotoUser = (id: number) => {
    window.scrollTo(0, 0)
    navigate(`/user/${id}`)
  }


  const handleClick = (page: number) => {
    setCurrentPage(page);
  };
  
  if(!allUsers) { return <div> Carregando... </div> }

  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPages = allUsers.meta.lastPage;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > MAX_BUTTONS) {
      const halfMaxButtons = Math.floor(MAX_BUTTONS / 2);
      const halfMaxButtonsRemainder = MAX_BUTTONS % 2 !== 0 ? 1 : 0;
      const halfButtonsToShow = halfMaxButtons + halfMaxButtonsRemainder;

      if (currentPage <= halfButtonsToShow) {
        endPage = MAX_BUTTONS;
      } else if (currentPage >= totalPages - halfButtonsToShow + 1) {
        startPage = totalPages - MAX_BUTTONS + 1;
      } else {
        startPage = currentPage - halfMaxButtons;
        endPage = currentPage + halfMaxButtonsRemainder + halfMaxButtons;
      }

      if (startPage > 1) {
        buttons.push(
          <button key="1" onClick={() => handleClick(1)}>
            1
          </button>
        );
        if (startPage > 2) buttons.push(<span className='ellipsis-start'>...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={i === currentPage ? 'page-active' : ''}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) buttons.push(<span className='ellipsis-start'>...</span>);
        buttons.push(
          <button key={totalPages} onClick={() => handleClick(totalPages)}>
            {totalPages}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={i === currentPage ? 'page-active' : ''}
          >
            {i}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div>
      <h1 className='user-list'>Lista de Usuários</h1>
        <div className='grid--user-list'>
          { isLoading ?
            <div className='loading'>Carregando...</div>
            :
          <>
            {allUsers.data.map((user, index) => {
              if(String(user.id) == window.env.TO_IGNORE_USER_ID) return;
              return (
                <div onClick={() => gotoUser(user.id)} className='user-item--list' key={index}>
                  <h2>{user.name}</h2>
                  <h3>Score: {user.score}</h3>
                  <img className='image-portrait--user-list' src={user.imageUrl}/>
                </div>
              )
            })}
          </>
          }
        </div>
      <div className='pagination-buttons--user-list'>
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default UsersList;