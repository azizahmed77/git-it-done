/*let getUserRepos = function() {
    console.log('function was called')
}*/

let getUserRepos = () => {
    fetch("https://api.github.com/users/octocat/repos")
}

getUserRepos()