import Repository from "../models/Repository"

export default function DisplayRepos(props: { repos: Repository[] }) {
    const { repos } = props;
    
    return (
        <ul>
          {repos.length > 0 && repos.map((repo: Repository) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>  
    )
}