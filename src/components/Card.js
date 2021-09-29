import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context';
import { Icon } from '@fluentui/react/lib/Icon';
import '../styles/card.css';

const Card = ({ user, index }) => {
  const { state, dispatch } = useContext(AppContext);
  const { term, users } = state;
  const { phone, email } = user;
  const { first, last } = user.name;
  const { city, state: locationState } = user.location;
  const { large: avatar } = user.picture;
  const [editable, setEditable] = useState(false);
  const [display, setDisplay] = useState(true);

  const handleEdit = () => setEditable(!editable);

  const handleInfoUpdate = (e) => {
    const dataKey = e.target.name;
    const updatedUser = { ...user };
    let newUsers;

    switch (dataKey) {
      case 'email':
      case 'phone':
        updatedUser[dataKey] = e.target.value.toLowerCase();
        break;
      case 'city':
      case 'state':
        updatedUser.location[dataKey] = e.target.value;
        break;
    }

    newUsers = [...users];
    newUsers[index] = updatedUser;

    dispatch({
      type: 'UPDATE_USERS',
      payload: newUsers,
    });
  };

  const handleStopEditing = (e) => {
    console.log('updates');
    e.preventDefault();
    setEditable(false);
  };

  const shouldShowCard = () => {
    const lowerCaseTerm = term.toLowerCase();
    const firstNameLowerCase = first.toLowerCase();
    const lastNameLowerCase = last.toLowerCase();
    const cityLowerCase = last.toLowerCase();
    const stateLowerCase = last.toLowerCase();
    const termFound =
      email.includes(lowerCaseTerm) ||
      firstNameLowerCase.includes(lowerCaseTerm) ||
      lastNameLowerCase.includes(lowerCaseTerm) ||
      cityLowerCase.includes(lowerCaseTerm) ||
      stateLowerCase.includes(lowerCaseTerm);

    setDisplay(termFound);
  };

  useEffect(() => shouldShowCard(), [term]);

  useEffect(() => shouldShowCard(), []);

  return display ? (
    <div className="card">
      <div className="card__header">
        <div className="card__edit" onClick={handleEdit}>
          <Icon iconName="Edit" />
        </div>
        <h2>{`${first} ${last}`}</h2>
        <div className="card__avatar">
          <img src={avatar} alt={first} />
        </div>
      </div>
      <div className="card__content">
        {editable ? (
          <form onSubmit={handleStopEditing}>
            <input
              onChange={handleInfoUpdate}
              name="email"
              placeholder="Enter your email"
            />
            <input
              onChange={handleInfoUpdate}
              name="phone"
              placeholder="Enter your phone"
            />
            <input
              onChange={handleInfoUpdate}
              name="city"
              placeholder="Enter your city"
            />
            <input
              onChange={handleInfoUpdate}
              name="state"
              placeholder="Enter your state"
            />
          </form>
        ) : (
          <>
            <p className="card__info">{email}</p>
            <p className="card__info">{phone}</p>
            <p className="card__info">{`${city}, ${locationState}`}</p>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default Card;
