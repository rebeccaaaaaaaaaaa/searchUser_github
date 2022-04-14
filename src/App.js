import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {

  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [login, setLogin] = useState("");
  const [repos, setRepos] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [joined, setJoined] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [company, setCompany] = useState("");
  const [blog, setBlog] = useState("");
  const [twitter, setTwitter] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setUser(e.target.value);
    console.log(user);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.name);
        setBio(data.bio);
        setJoined(data.created_at);
        setLogin(data.login);
        setRepos(data.public_repos);
        setFollowers(data.followers);
        setFollowing(data.following);
        setAvatar(data.avatar_url);
        setLocation(data.location);
        setCompany(data.company);
        setBlog(data.blog);
        setTwitter(data.twitter_username);
        setAvatar(data.avatar_url);
      
        console.log(data);
      });
  };


  return (
    <main>
      <div className="contentWrapper">
        <Header />
        <div className="search">
          <input
            type="text"
            placeholder="Pesquisar"
            className="input"
            onChange={handleSearch}
          />
          <button className="buttonSearch" onClick={handleSubmit}>
            buscar
          </button>
        </div>
        {
          // verificar se tem dados
          login ? (
            <div className="results">
              <div className="resultImage">
                <img src={avatar} alt="imagem" />
              </div>
              <div className="result-content">
                <div className="resultInfoHeader">
                  <div className="result-info-header--wrapper">
                    <h2 className="result-info--name"> {userName ? userName : "Sem nome"} </h2>
                    <small className="result-info-user"> @{login ? login : "no info"} </small>
                  </div>
                  <span className="resultInfoJoined">
                    Joined
                    {joined ? joined : "Sem informação"}
                  </span>
                </div>

                <div className="result-info-bio">
                  <p> {bio ? bio : "Sem biografia"} </p>
                </div>

                <div className="resultInfoReposInfo">
                  <div className="resultInfoReposInfoRepos">
                    <span> Repos </span>
                    <span> {repos ? repos : "0"} </span>
                  </div>
                  <div className="resultInfoReposInfoFollowers">
                    <span> Followers </span>
                    <span> {followers ? followers : "0"} </span>
                  </div>
                  <div className="resultInfoReposInfoFollowing">
                    <span> Following </span>
                    <span> {following ? following : "0"} </span>
                  </div>
                </div>

                <div className="resultInfoHeaderWrapper">
                  <div className="adicionalInfoLocation">
                    <span> {location ? location : "Sem informação"} </span>
                  </div>
                  <div className="adicionalInfoSite">
                    <a href=" "> {blog ? blog : "Sem informação" } </a>
                  </div>
                  <div className="adicionalInfoSocial">
                    <a href=" "> {twitter ? twitter : "Sem informação"} </a>
                  </div>
                  <div className="adicionalInfoOrganization">
                    <span> {company ? company : "Sem informação"} </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p> Informações não encontradas</p>
          )
        }
      </div>
    </main>
  );
}

export default App;
