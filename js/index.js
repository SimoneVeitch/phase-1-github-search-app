document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        searchUsers(searchTerm);
      }
    });
  
    function searchUsers(searchTerm) {
      const url = `https://api.github.com/search/users?q=${searchTerm}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          displayUsers(data.items);
        })
        .catch((error) => console.error('Error fetching users:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach((user) => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" />
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        userItem.addEventListener('click', () => {
          getUserRepos(user.login);
        });
        userList.appendChild(userItem);
      });
    }
  
    function getUserRepos(username) {
      const url = `https://api.github.com/users/${username}/repos`;
      fetch(url)
        .then((response) => response.json())
        .then((repos) => {
          displayRepos(repos);
        })
        .catch((error) => console.error('Error fetching user repos:', error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach((repo) => {
        const repoItem = document.createElement('li');
        repoItem.textContent = repo.full_name;
        reposList.appendChild(repoItem);
      });
    }
  });
  