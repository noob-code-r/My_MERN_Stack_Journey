const userName =  document.querySelector('#input-name');
const searchButton = document.querySelector('.search');
const displayName = document.querySelector('[data-displayName]');
const dateOfJoining = document.querySelector('.date-of-joining');
const gitlink = document.querySelector('[data-github-link]');
const userpic = document.querySelector('[data-userpic]');
const biography = document.querySelector('.biography');
const noOfRepos = document.querySelector('[data-numberOfRepos]');
const noOfFollowers = document.querySelector('[data-numberoffollowrs]');
const noOfFollowing = document.querySelector('[data-numberoffollowing]');
// const userSocialLink=document.querySelector('.user-social-link');
const userLocation = document.querySelector("[data-location]");
const twitterUsername = document.querySelector("[data-twitter]");
const userEmail = document.querySelector("[data-email]");
const theme = document.querySelector(".theme");

let isDark = false;





userName.addEventListener('keydown',(e)=>
{
    if(e.key === "Enter")
        {
            const name =userName.value.trim();
            if(name !== "")
            {
                apicall(name);
            }
        };
})




theme.innerHTML = `<span>LIGHT</span> <i class="fa-solid fa-sun"></i>`;

theme.addEventListener("click", () => {
  isDark = !isDark;

  document.body.classList.toggle("dark-theme", isDark);

  if (isDark) {
    theme.innerHTML = `<span>DARK</span> <i class="fa-solid fa-moon"></i>`;
  } else {
    theme.innerHTML = `<span>LIGHT</span> <i class="fa-solid fa-sun"></i>`;
  }
});

searchButton.addEventListener('click',()=>{
    let name=userName.value.trim();
    if(name !== "")
    {
        apicall(name);
    }
    
})
apicall('noob-code-r');

async function apicall(username){
try{
    
    const response = await fetch(`https://api.github.com/users/${username}`);
    if(!response.ok)
    {
        throw new Error("User Not Found");
    }
    const data= await response.json();

    initializeData (data);
    // console.log("Data ",data);
}
catch(error){
    alert(error.message);
}

}

function initializeData(data)
{
    displayName.innerText = data?.name || data?.login;
    const joinDate = new Date(data?.created_at);
    dateOfJoining.innerText =`Joined ${joinDate.toLocaleDateString("en-US", {day: "numeric",month: "long",year: "numeric"})}`;

    if (data?.html_url) {
        gitlink.href = `${data?.html_url}`;
        // gitlink.innerText = `@${data?.name.replace(/\s+/g, "").toLowerCase()}`;
        gitlink.innerText = `@${data.login}`;
    }
    

    userpic.src = data?.avatar_url;

    if (data?.bio) {
        biography.innerText = data?.bio;
    }
    else{
        biography.innerText = "This Profile has no bio";
    }
    
    noOfRepos.innerText = data?.public_repos;
    noOfFollowers.innerText=data?.followers;
    noOfFollowing.innerText = data?.following;

    if(data?.location && data?.location.trim() !== "")
    {
        userLocation.innerHTML=`<i class="fa-solid fa-location-dot"> </i> <span>${data?.location}</span>`;
    }
    else{
        userLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> <span>Location Not Available</span>`;
    }
    
    // twitterUsername.innerText = `${data?.twitter_username}`;
    // twitterUsername.href=`https://x.com/search?q=${data?.twitter_username}`;

if (data?.twitter_username) {
  twitterUsername.href = `https://x.com/${data.twitter_username}`;
  twitterUsername.target="_blank";
 twitterUsername.style.pointerEvents = "auto";
  twitterUsername.innerHTML = `<i class="fa-brands fa-twitter"></i><span>@${data.twitter_username}</span>`;
} else {
    twitterUsername.removeAttribute("href");
  twitterUsername.removeAttribute("target");
  twitterUsername.style.pointerEvents = "none";
  twitterUsername.innerHTML = `<i class="fa-brands fa-twitter"></i><span>Not Available</span>`;
}



if(data?.email)
{
    userEmail.innerText = `<i class="fa-solid fa-envelope"></i><span>${data?.email}</span>`;
}
else{
    userEmail.innerHTML = `<i class="fa-solid fa-envelope"></i><span>Not Available</span>`;
}

};





 