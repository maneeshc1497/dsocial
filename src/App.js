import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import SocialNetwork from "./abis/SocialNetwork.json";
import Web3 from "web3";
import { create } from "ipfs-http-client";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const client = create('https://ipfs.infura.io:5001/api/v0');

function App() {
  const [account, setAccount] = useState("");
  const [dSocial, setdSocial] = useState();
  const [web3, setweb3] = useState();
  const [postCount, setpostCount] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.etherum) {
        window.web3 = new Web3(window.etherum);
        await window.etherum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Etherum browser detected. You should consider trying MetaMask!"
        );
      }
    };
    loadWeb3();
    const loadBlockChain = async () => {
      const web3 = window.web3;
      setweb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const networkId = await web3.eth.net.getId();

      const networkData = SocialNetwork.networks[networkId];
      if (networkData) {
        const dSocial = new web3.eth.Contract(
          SocialNetwork.abi,
          networkData.address
        );
        setdSocial(dSocial);
      } else {
        window.alert("DSocial Contract not deployed to detected Network");
      }
    };
    loadBlockChain();
  }, []);
  useEffect(() => {
    
    const loadData = async () => {
      
      
      let pCount = await dSocial.methods.postCount().call();
       setpostCount(pCount);
      
      //load posts sort by latest
      for (var i = pCount; i >= 1; i--) {
        const post = await dSocial.methods.posts(i).call();
        setPosts((dposts) => [...dposts, post]);
        console.log(post)
      }
      
    };
    if(typeof dSocial !== 'undefined' && typeof account !== 'undefined')
      {
        
        loadData();
      }
    
  }, [account, dSocial,web3]);
  const uploadVideo = async (text,buffer)=>{
    try{
      setLoading(true);
      const created = await client.add(buffer);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
           
       dSocial.methods.CreatePost(text,url).send({from : account}).on('transactionHash',async (hash) => { console.log(url); setLoading(false);setLoad(!load)
        let pCount = await dSocial.methods.postCount().call();
        const post = await dSocial.methods.posts(pCount).call();
        setPosts((dposts) => [post,...dposts]);})
       

    }catch(error){
      console.log(error);
    }
    
  }
  const tipPost = async(id,tipAmount)=>{
    setLoading(true);
    dSocial.methods.tipPost(id).send({from : account,value: tipAmount}).on('transactionHash',async (hash) => { console.log('Tipped'); setLoading(false);setLoad(!load);
    
  })
     
  }
  return (
    <div className="App">
      <Navbar account={account} />
      <CreatePost uploadVideo={uploadVideo}/>
      {loading && <h3>loading.....</h3>}
       <div className="feed">
      { posts.map((pos,key)=>{
                return <Posts  
                key={key}
                id={pos.id}              
                content={pos.content}
                imgHash={pos.imgHash}
                tipAmount={pos.tipAmount}
                author={pos.author}
                tipPost={tipPost}/>

            })}  
            </div>
    </div>
  );
}

export default App;
