import { useState, useEffect } from 'react';
import fetchRepos from '../../src/api/fetch-repos';

interface DisplayReposProps {
  user: string;
}

interface Repository {
  name: string;
  id: string;
  url: string;
  language: string;
}

export default function DisplayRepos(props: DisplayReposProps) {
  const [repos, setRepos] = useState([]);
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

    setRepos(chunkedRepositoryList);
  };

  const filterByLanguage = () => {
    if (languageToFilter === '') {
      fetchRepoList();
    } else {
      let filteredRepos = repos.filter(
        (repo: Repository) =>
          repo?.language?.toLowerCase() === languageToFilter?.toLowerCase()
      );
      setRepos(filteredRepos);
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
      {repos.length > 0 && (
        <ul>
          {repos.map((repo: Repository) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
