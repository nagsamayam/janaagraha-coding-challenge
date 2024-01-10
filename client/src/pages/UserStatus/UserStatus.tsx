import { useContext } from 'react';
import './UserStatus.scss';
import { UserContext } from '../../providers/UserProvider';
import { Link } from 'react-router-dom';

export default function UserStatus() {
  const { contextUser } = useContext(UserContext);

  const fullName = `${contextUser.firstName} ${contextUser.lastName}`;

  return (
    <section className='user-details'>
      <h3>User Details</h3>
      <div>
        <p>
          <strong>Full Name</strong>: {fullName}
        </p>
        <p>
          <strong>E-mail</strong>: {contextUser.email}
        </p>
        <p>
          <strong>Avatar URL</strong>:{' '}
          <a href={contextUser.avatarUrl} target='_blank'>
            {contextUser.avatarUrl}
          </a>
        </p>
        <img src={contextUser.avatarUrl} alt={fullName} width={150} />
      </div>
      <div>
        <Link to='/'>Go to Home</Link>
      </div>
    </section>
  );
}
