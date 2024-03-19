import { useState } from 'react';
import DisplayReposForm from './components/display-repos-form';
import './App.css';

function App() {
  const [user, setUser] = useState('');
  const [repoListVisbility, setRepoListVisibility] = useState(false);

  // you don't need useCallback
  const handleChange = (ev: { target: { value: string } }) => {
    setUser(ev.target.value);
  };

  // you don't need useCallback here as well
  const toggleListVisibility = () => {
    setRepoListVisibility(true);
  };

  return (
    <>
      <input onChange={handleChange} />
      <button onClick={toggleListVisibility}>Show Repositories</button>
      {repoListVisbility && <DisplayReposForm user={user} />}
    </>
  );
}

export default App;
