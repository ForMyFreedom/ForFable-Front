import Paginator from '../paginator/Paginator';
import './UsersList.css';
import { useNavigate } from 'react-router-dom';
import { UserEntity, UsersController } from '@/ForFable-Domain';

interface UserProps {
  userService: UsersController
}

const UsersList: React.FC<UserProps> = ({ userService }) => {
  const navigate = useNavigate();

  const gotoSelected = (id: number) => {
    window.scrollTo(0, 0)
    navigate(`/user/${id}`)
  }

  return (
    <div>
        <h1 className='user-list-header'>Lista de Usuários</h1>
        <Paginator<UserEntity>
          indexFunction={async (page: number) => await userService.index(page)}
          renderAll={(userList) => (
            <div className='grid--user-list'>
            {!userList ?
                <div className='loading'>Carregando...</div> :
                <>
                  {userList.all.map((user, index) => {
                    if(String(user.id) == window.env.TO_IGNORE_USER_ID) return <></>;
                    return (
                      <div onClick={() => gotoSelected(user.id)} className='user-item--list' key={index}>
                        <h2>{user.name}</h2>
                        <h3>Score: {user.score}</h3>
                        <img className='image-portrait--user-list' src={user.imageUrl}/>
                      </div>
                    )
                    }
                  )}
                </>
            }
            </div>
          )}
        />
    </div>
  )
};

export default UsersList;