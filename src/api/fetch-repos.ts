export default async function fetchRepos(user: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    
    return await response.json();
  } catch (error) {
    console.log('Error fetching github repos');
    throw error;
  }
}
