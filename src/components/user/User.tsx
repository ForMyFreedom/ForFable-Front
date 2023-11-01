import './User.css';
import UserCard from './components/user-card/UserCard';
import UserInteractions from './components/user-interactions/UserInteractions';
import { ReactDuo } from '../../utils/react';
import { useEffect, useState } from 'react';
import { UserEntity, UserWithToken, UsersUsecase } from '../../for-fable-domain';

interface UserProps {
  userDuo: ReactDuo<UserWithToken|undefined>
  searchUserId: number
  userService: UsersUsecase
}

const User: React.FC<UserProps> = ({userDuo, searchUserId, userService}) => {
  const [userData] = userDuo
  const searchUserDuo = useState<UserEntity|null>()
  const [searchUser, setSearchUser] = searchUserDuo

  const isUser = searchUserId ? userData?.user.id === Number(searchUserId) : false

  useEffect(() => {
    const loadUser = async () => {
        const response = await userService.show(searchUserId)
        if (response.data) {
            setSearchUser(response.data)
        }
    }

    loadUser()
  }, [searchUserId, setSearchUser, userService])

  if(!searchUser) { return <div> Carregando... </div> }

  return (
    <div className='block'>
      <UserCard userDuo={searchUserDuo as ReactDuo<UserEntity>} isUser={isUser}/>
      <UserInteractions user={searchUser} />
    </div>
  );
};

export default User;