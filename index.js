const API="https://api.github.com/users/";
let main=document.querySelector(".main");


const getUserDetail = async(username)=>{
    const response= await fetch(API+username);
    if(response.ok){
        const userDetail= await response.json();
        main.innerHTML=`<div class="profilePicture">
        <img id="DP" src="${userDetail.avatar_url}" >
    </div>
    <div class="UseInfo">
        <h3 class="name">${userDetail.login.toUpperCase()}</h3>
        <ul class="info">
            <li>${userDetail.followers} <b>Followers</b></li>
            <li>${userDetail.following} <b>Following</b></li>
            <li>${userDetail.public_repos} <b>Repos</b></li>
        </ul>
    
        <div id="repos">
            
        </div>
    </div>`;
    const getrepos = async()=>{
        let repo=document.querySelector("#repos");
        const response=await fetch(API+username+"/repos");
        const repos = await response.json();
        
        repos.forEach((e) => {
            let aLink=document.createElement('a');
            aLink.href=e.html_url;
            aLink.innerText=e.name;
            aLink.target="_blank";
            repo.appendChild(aLink);
        });
        
    }
    getrepos();
    }
    else{
        handleError();
    }
}
getUsername=document.querySelector("#search-User");
getUsername.addEventListener('keypress',function (e){
    if(e.key=='Enter' && this.value!="" && this.value!=null){
        getUserDetail(this.value)
        this.value=""
    }
    
});


function handleError(){
    main.innerHTML="";
    let e=document.createElement('h3');
    e.classList.add("para")
    e.innerText="Please pass a valid UserName";
    main.appendChild(e);
}

