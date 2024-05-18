let nodelistupper;
let nodelistlower;
let searchitem = "";
let copyarr = [];
document.addEventListener("DOMContentLoaded", function () {
  let reposButton = document.getElementById("no-of-repos");
  reposButton.addEventListener("click", function () {
    document.getElementById("lowerbody").scrollIntoView({ behavior: "smooth" });
  });

  // document.querySelector("#buttons").style.visibility = "hidden";
  nodelistupper = document.querySelectorAll(".stats");
  nodelistupper.forEach(function (e) {
    e.style.visibility = "hidden";
  });

  nodelistlower = document.querySelector(".container-body");
  // nodelistlower.style.visibility = "hidden";
  var profile = document.getElementById("profile");

  let interval_id;

  function startPopping() {
    interval_id = setInterval(() => {
      profile.style.width = "81%";
      profile.style.height = "81%";
      profile.style.boxShadow = "10px 10px 5px rgb(197, 208, 211)";
      profile.style.transition = "1.5s ease-in-out";

      setTimeout(() => {
        profile.style.width = "80%";
        profile.style.height = "80%";
        profile.style.boxShadow = "none";
      }, 1500);
    }, 3000);
  }

  function stopPopping() {
    clearInterval(interval_id);
  }

  startPopping();

  profile.addEventListener("mouseenter", function (e) {
    stopPopping();
    this.style.width = "81%";
    this.style.height = "81%";
    this.style.boxShadow = "20px 20px 5px rgb(197, 208, 211)";

    setTimeout(() => {
      this.style.width = "80%";
      this.style.height = "80%";
      this.style.boxShadow = "none";
    }, 2000);
  });

  profile.addEventListener("mouseleave", function () {
    startPopping();
  });
});

let naam;
let bio;
let followers;
let totalRepos;
let loc;

function profilesection() {
  document.querySelector("#upperbody").scrollIntoView({ behavior: "smooth" });
}
function updatedInput() {
  username = document.querySelector("input").value;
}

function updatedSearch() {
  searchitem = document.querySelector("#searchbar input").value.toLowerCase();
  console.log(searchitem);
  copyarr.forEach(function (item, index) {
    if (item.includes(searchitem)) {
      let repoElements = document.querySelectorAll(".repo");
      repoElements[index].scrollIntoView({ behavior: "smooth" });
    }
  });
}

document
  .querySelector("#searchbar input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchItemFun();
    }
  });
// function searchItemFun() {
//   console.log(searchitem);
//   let repoIndex2 = copyarr.indexOf(searchitem);

//   if (repoIndex2 === -1) {
//     alert("Item not found");
//   } else {
//     // Scroll to the specific repo
//     let repoElements = document.querySelectorAll(".repo");
//     repoElements[repoIndex2].scrollIntoView({ behavior: "smooth" });
//   }
// }

document.querySelector("input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    executeThis();
  }
});
async function executeThis() {
  await fetch(`https://api.github.com/users/${username}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      clearrepo();
      setprofile(response.avatar_url);
      setuser(response);
    });

  await fetch(`https://api.github.com/users/${username}/repos`)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      setrepo(response);
    });
}

function clearrepo() {
  let node = document.querySelectorAll(".container-body");
  node.forEach(function (node) {
    node.innerHTML = "";
  });
  document.querySelector("#searchbar input").value = "";
}
function setprofile(avatar) {
  document.querySelector("img").setAttribute("src", avatar);
}
function setuser(userData) {
  nodelistupper.forEach(function (e) {
    e.style.visibility = "visible";
  });
  naam = userData.name;
  bio = userData.bio;
  totalRepos = userData.public_repos;
  followers = userData.followers;
  loc = userData.location;

  document.querySelector("#h2name").innerText = naam;
  document.querySelector("#h4bio").innerText = bio;
  document.querySelector("#h2projects").innerText = totalRepos;
  document.querySelector("#h3followers").innerText = followers;
  document.querySelector("#h3location").innerText = loc;
}

function setrepo(repoData) {
  repoData.forEach(function (element, index) {
    let url = element.html_url;

    // nodelistlower.style.visibility = "visible";

    let repo = document.createElement("div");
    repo.classList.add("repo");

    let aboutrepo = document.createElement("div");
    aboutrepo.classList.add("aboutrepo");
    aboutrepo.textContent = element.name;
    aboutrepo.style.color = "black";
    copyarr[index] = element.name.toLowerCase();
    console.log(copyarr[index]);

    let abouturl = document.createElement("div");
    abouturl.classList.add("repolink");
    let a = document.createElement("a");
    a.href = url;
    a.setAttribute("target", "_blank");
    a.textContent = url;
    a.style.color = "black";

    abouturl.appendChild(a);

    repo.appendChild(aboutrepo);
    repo.appendChild(abouturl);

    nodelistlower.appendChild(repo);
  });
}
