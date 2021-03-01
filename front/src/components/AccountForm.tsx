import React, { useState } from 'react';
import axios from 'axios';

function AccountForm() {
  const [email, setEmail] = useState('');

  var submit = () => {
    axios
      .post('/api/user/new', {
        email: email,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        name='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type='submit' onClick={() => submit()}>
        Create
      </button>
    </div>
  );
}

export default AccountForm;
