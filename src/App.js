import React, { useState, useEffect, Suspense } from 'react';
import './App.css';
import axios from 'axios';

const Post = React.lazy(() => import('./Post'));

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function renderElements() {
      axios.get('https://animall-backend-assesment.herokuapp.com/data')
        .then(res => {
          const newData = res.data.data;
          setData(newData);
        })
    }
    renderElements();
  }, [])
  return (
    <div className="App">
      <div className="App-header">
        <img src="https://static-assets.animall.in/static/images/animall-logo-2021.png" alt="Animall" width="147" height="51" />
      </div>
      <div className="holder">
        {data.map((post, index) => (
          <Suspense fallback={<div />} key={post._id}>
            <Post key={index} data={post} />
          </Suspense>
        )
        )
        }
      </div>
    </div>
  );
}

export default App;
