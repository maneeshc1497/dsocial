import React from 'react';
import './Posts.css'
import Web3 from "web3";
function Posts({
    id,
    content,
    imgHash,
    tipAmount,
    author,
    tipPost
}) {
    const onClickHandler=(e)=>{
        e.preventDefault();        
        let tipAmount = window.web3.utils.toWei('0.1','Ether');
        tipPost(e.target.name,tipAmount);
    }
  return <div className="posts">
  <div className="posts_header">
      <div className="posts_headerleft">      
      <p style={{fontWeight:"600"}}> {author}</p>
      </div>     
  </div>
  <div className="posts_Center">
      <img src={imgHash} alt=""/>
  </div>
  <div>
  <p style={{fontWeight:"600"}}>
      
      {content}</p>
      <div className='posts_tip'>          
      <p>Tip: {window.web3.utils.fromWei(tipAmount.toString(),'Ether')} ETH</p>
      <button className='posts_tip_btn'
      name={id} 
      onClick={onClickHandler}>
      TIP : 0.1ETH</button>  </div>
      
  </div>  
</div>;
}

export default Posts;
