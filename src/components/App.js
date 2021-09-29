import React, { useState, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import Card from './Card';
import SearchBar from './SearchBar';
import { AppContext } from '../context';

import '../styles/app.css';
import '../styles/style.css';

export default function App() {
  const { state, dispatch } = useContext(AppContext);
  const { users, sort } = state;
  const randomUserGeneratorAPI = 'https://randomuser.me/api/';

  useEffect(() => {
    initializeIcons();

    const response = axios
      .get(randomUserGeneratorAPI, {
        params: {
          results: '10',
        },
      })
      .then((response) => {
        dispatch({
          type: 'UPDATE_USERS',
          payload: response.data.results,
        });
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    sortUsers();
  }, [sort]);

  useEffect(() => {
    renderCards();
  }, [users]);

  const sortUsers = () => {
    const sortedUsers = [...users];
    sort === 'desc'
      ? sortedUsers.sort((a, b) => {
          if (a.name.first < b.name.first) {
            return -1;
          } else if (a.name.first > b.name.first) {
            return 1;
          } else {
            return 0;
          }
        })
      : sortedUsers.sort((a, b) => {
          if (a.name.first < b.name.first) {
            return 1;
          } else if (a.name.first > b.name.first) {
            return -1;
          } else {
            return 0;
          }
        });

    dispatch({
      type: 'UPDATE_USERS',
      payload: sortedUsers,
    });
  };

  const renderCards = () => {
    return (
      <section className="content">
        <SearchBar />
        <div className="cards-list">
          {users.length !== 0 &&
            users.map((user, index) => (
              <Card user={user} key={index} index={index} />
            ))}
        </div>
      </section>
    );
  };

  return <div>{renderCards()}</div>;
}
