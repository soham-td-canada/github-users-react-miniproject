import { useState, useEffect } from 'react';
import fetchRepos from '../api/fetch-repos';
import Repository from '../models/Repository';
import DisplayRepos from './display-repos';

interface DisplayReposProps {
  user: string;
}

export default function DisplayReposForm(props: DisplayReposProps) {
  const [nonFilteredRepos, setNonFilteredRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [languageToFilter, setLanguageToFilter] = useState('');
  const { user } = props;

  const setupLanguageFilter = (ev: { target: { value: string } }) => {
    setLanguageToFilter(ev.target.value);
  };

  const fetchRepoList = async () => {
    const repos = await fetchRepos(user);
    const chunkedRepositoryList = repos.map((repo: Repository) => {
      const { name, id, url, language } = repo;

      return {
        name,
        id,
        url,
        language,
      };
    });

    setNonFilteredRepos(chunkedRepositoryList);
  };

  const filterByLanguage = () => {
    if (languageToFilter === '') {
      fetchRepoList();
    } else {
      debugger;
      let filteredRepos = nonFilteredRepos.filter(
        (repo: Repository) =>
          repo?.language?.toLowerCase() === languageToFilter?.toLowerCase()
      );
      setFilteredRepos(filteredRepos);
    }
  };

  useEffect(() => {
    fetchRepoList();
  }, [user]);


  return (
    <div>
      <h1> List of Repos for {user} </h1>
      <input value={languageToFilter} onChange={setupLanguageFilter} />
      <button onClick={filterByLanguage}>Filter By Language</button>
      {languageToFilter === '' && <DisplayRepos repos={nonFilteredRepos} />}
      {languageToFilter !== '' && <DisplayRepos repos={filteredRepos} />}
    </div>
  );
}
