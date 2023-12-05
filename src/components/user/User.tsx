import './User.css';
import UserCard from './components/user-card/UserCard';
import UserInteractions from './components/user-interactions/UserInteractions';
import { ReactDuo } from '../../utils/react';
import { useEffect, useState, useContext } from 'react';
import { UserEntity } from '../../../ForFable-Domain';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ServicesContext } from '../../contexts/ServicesContext';

interface UserProps {
  requestUserDuo: ReactDuo<UserEntity|null>
  searchUserId: number
}

const User: React.FC<UserProps> = ({requestUserDuo, searchUserId }) => {
  const [userData] = requestUserDuo
  const searchUserDuo = useState<UserEntity|null>()
  const [searchUser, setSearchUser] = searchUserDuo
  const [lang] = useContext(LanguageContext)
  const { UsersService } = useContext(ServicesContext)


  const isUser = searchUserId ? userData?.id === Number(searchUserId) : false

  useEffect(() => {
    const loadUser = async () => {
        if(searchUserId==userData?.id){
            setSearchUser(userData)
            return
        }
        const response = await UsersService.show(searchUserId)
        if (response.state=='Sucess') {
            setSearchUser(response.data)
        }
    }
    loadUser()
  }, [searchUserId, setSearchUser, UsersService, userData])

  if(!searchUser) { return <div> {lang.Loading}... </div> }

  return (
    <div className='block'>
      <UserCard userDuo={(searchUserId === userData?.id ? requestUserDuo : searchUserDuo) as ReactDuo<UserEntity>} isUser={isUser}/>
      <UserInteractions userId={searchUser.id} />
    </div>
  );
};

export default User;