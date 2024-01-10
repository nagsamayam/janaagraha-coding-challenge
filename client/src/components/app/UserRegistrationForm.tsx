import './UserRegistrationFrom.scss';

import React, { useState } from 'react';

import Section from '../ui/Section';
import FormControl from '../ui/FormControl';
import Button from '../ui/Button/Button';
import { UserContext } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';

const defaultUser = {
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
};

export default function UserRegistrationForm() {
  const [user, setUser] = useState(defaultUser);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const { setContextUser } = React.useContext(UserContext);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name;
    const value = e.target.type === 'text' ? e.target.value : e.target.files?.[0];
    setUser((current) => {
      const next = { ...current } as any;
      next[key] = value;
      return next;
    });
  }

  function handleReset() {
    setUser(defaultUser);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user.firstName === '' || user.lastName === '' || user.email === '' || user.avatar === '') {
      alert('Invalid input. Please fill all the form fields');
      return;
    }

    let formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('avatar', user.avatar);

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setSuccessMsg(`${data.message}`);
      setContextUser(data.user);

      handleReset();

      setTimeout(
        () =>
          navigate({
            pathname: '/user-status',
          }),
        5000
      );
    } catch (e) {
      setErrorMsg(`Some thing went wrong. Please try again`);
    }

    handleReset();
  }

  return (
    <Section>
      <h3>Registration Form</h3>
      {successMsg || errorMsg ? (
        <div className='alertMessage'>
          {successMsg ? (
            <>
              <strong>Suceess.</strong> {successMsg}
            </>
          ) : null}
          {errorMsg ? (
            <>
              <strong>Error.</strong> {errorMsg}
            </>
          ) : null}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate>
        <FormControl id='firstName' label='First Name'>
          <input id='firstName' name='firstName' value={user.firstName} onChange={handleInputChange} />
        </FormControl>

        <FormControl id='lastName' label='Last Name'>
          <input id='lastName' name='lastName' value={user.lastName} onChange={handleInputChange} />
        </FormControl>

        <FormControl id='email' label='E-mail'>
          <input id='email' name='email' value={user.email} onChange={handleInputChange} />
        </FormControl>

        <FormControl id='avatar' label='Avatar'>
          <input type='file' id='avatar' name='avatar' accept='image/*' onChange={handleInputChange} />
        </FormControl>

        <div className='form-control-buttons'>
          <Button type='reset' onClick={handleReset}>
            Cancel
          </Button>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Section>
  );
}
