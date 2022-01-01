/*let getUserRepos = function() {
    console.log('function was called')
}*/
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");

let userFormEl = document.querySelector('#user-form')
let nameInputEl = document.querySelector('#username')
let getUserRepos = (user) => {
    // format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then((response) => {
        if (response.ok) {
         response.json().then((data) => {
          displayRepos(data,user)
          console.log(data);
      })
    } else {
        alert('Error: Github User Not Found')
        }
    })
    .catch((error) => {
        //Notice this. '.catch()' getting chained onto the end of the '.then()'
        alert('unable to connect to Github')
    })
    
};

let formSubmitHandler = (event) => {
    event.preventDefault()
    let username = nameInputEl.value.trim();

    if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
    } else {
    alert("Please enter a GitHub username");
    }
}

let displayRepos = (repos, searchTerm) => {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos
    for(let i=0;i<repos.length;i++) {
        //format repo name 
        let repoName = repos[i].owner.login + "/" + repos[i].name;


        //create a container for each repo
        let repoEl = document.createElement("div")
        repoEl.classList = "list-item flex-row justify-space-between align-center"


        // create a span element to hold repository name
        let titleEl = document.createElement("span")
        titleEl.textContent = repoName

        //append to container
        repoEl.appendChild(titleEl)

        let statusEl = document.createElement("span")
        statusEl.classList = "flex-row align-center"

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        } 

        repoEl.appendChild(statusEl)

        repoContainerEl.appendChild(repoEl)
    }

};


userFormEl.addEventListener("submit", formSubmitHandler);