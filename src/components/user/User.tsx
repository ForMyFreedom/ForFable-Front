import './User.css';
import UserCard from './components/user-card/UserCard';
import UserInteractions from './components/user-interactions/UserInteractions';
import { ReactDuo } from '../../utils/react';
import { useEffect, useState, useContext } from 'react';
import { UserEntity, UserWithToken } from '../../../ForFable-Domain';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ServicesContext } from 'src/contexts/ServicesContext';

interface UserProps {
  userDuo: ReactDuo<UserWithToken|undefined>
  searchUserId: number
}

const User: React.FC<UserProps> = ({userDuo, searchUserId }) => {
  const [userData] = userDuo
  const searchUserDuo = useState<UserEntity|null>()
  const [searchUser, setSearchUser] = searchUserDuo
  const [lang] = useContext(LanguageContext)
  const { UsersService } = useContext(ServicesContext)


  const isUser = searchUserId ? userData?.id === Number(searchUserId) : false

  useEffect(() => {
    const loadUser = async () => {
        const response = await UsersService.show(searchUserId)
        if (response.state=='Sucess') {
            setSearchUser(response.data)
        }
    }
    loadUser()
  }, [searchUserId, setSearchUser, UsersService])

  if(!searchUser) { return <div> {lang.Loading}... </div> }

  return (
    <div className='block'>
      <UserCard userDuo={(searchUserDuo[0]?.id == userData?.id ? userDuo : searchUserDuo) as ReactDuo<UserEntity>} isUser={isUser}/>
      <UserInteractions userId={searchUser.id} />
    </div>
  );
};

export default User;