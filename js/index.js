document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            searchUsers(query);
        }
    });

    function searchUsers(query) {
        fetch(`https://api.github.com/search/users?q=${query}`, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(data => displayUsers(data.items))
        .catch(error => console.error("Error fetching users:", error));
    }

    function displayUsers(users) {
        userList.innerHTML = "";
        reposList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}" width="50">
                <a href="${user.html_url}" target="_blank">${user.login}</a>
                <button data-username="${user.login}">View Repos</button>
            `;
            li.querySelector("button").addEventListener("click", () => {
                fetchUserRepos(user.login);
            });
            userList.appendChild(li);
        });
    }

    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(data => displayRepos(data))
        .catch(error => console.error("Error fetching repos:", error));
    }

    function displayRepos(repos) {
        reposList.innerHTML = "";
        repos.forEach(repo => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            reposList.appendChild(li);
        });
    }
});
