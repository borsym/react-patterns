import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const withEditableUser = (Component, userId) => {
  return (props) => {
    const [originalUser, setOriginaluser] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(`/users/${userId}`);
        setOriginaluser(response.data);
        setUser(response.data);
      })();
    }, []);

    const onChangeUser = (changes) => {
      setUser({ ...user, ...changes });
    };

    const onSaveUser = async () => {
      const response = await axios.put(`/users/${userId}`, { user });
      setOriginaluser(response.data);
      setUser(response.data);
    };

    return (
      <Component
        {...props}
        user={user}
        onChangeUser={onChangeUser}
        onSaveUser={onSaveUser}
      />
    );
  };
};
