import React, { useReducer, useEffect } from 'react';
import request from '../utils/request';
import styles from './index.css';

function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

export default function({ location }) {
  const initialCount = 1;
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  useEffect(() => {
    request('/api/reqdata', {
      data: {},
      method: 'post',
    }).then(data => {
      dispatch({ type: 'reset', payload: data.count });
    });
  }, location.pathname);

  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">Getting Started</a>
        </li>
      </ul>
    </div>
  );
}
