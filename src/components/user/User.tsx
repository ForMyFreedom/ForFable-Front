import './User.css';
import UserCard from './components/user-card/UserCard';
import UserInteractions from './components/user-interactions/UserInteractions';
import { ReactDuo } from '../../utils/react';
import { useEffect, useState, useContext } from 'react';
import { UserEntity, UserWithToken, UsersController, ImagesController } from '../../../ForFable-Domain';
import { LanguageContext } from '../../contexts/LanguageContext';

interface UserProps {
  userDuo: ReactDuo<UserWithToken|undefined>
  searchUserId: number
  userService: UsersController
  imageService: ImagesController
}

const User: React.FC<UserProps> = ({userDuo, searchUserId, userService, imageService }) => {
  const [userData] = userDuo
  const searchUserDuo = useState<UserEntity|null>()
  const [searchUser, setSearchUser] = searchUserDuo
  const [lang] = useContext(LanguageContext)

  const isUser = searchUserId ? userData?.id === Number(searchUserId) : false

  useEffect(() => {
    const loadUser = async () => {
        const response = await userService.show(searchUserId)
        if (response.state=='Sucess') {
            setSearchUser(response.data)
        }
    }
    loadUser()
  }, [searchUserId, setSearchUser, userService])

  if(!searchUser) { return <div> {lang.Loading}... </div> }

  return (
    <div className='block'>
      <UserCard userService={userService} imageService={imageService} userDuo={(searchUserDuo[0]?.id == userData?.id ? userDuo : searchUserDuo) as ReactDuo<UserEntity>} isUser={isUser}/>
      <UserInteractions userId={searchUser.id} userService={userService} />
    </div>
  );
};

export default User;