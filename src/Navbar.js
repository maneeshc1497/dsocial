import React from 'react';



function Navbar(props) {
  return <div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#"><strong style={{color:'#a80e35',fontSize:'25px'}}>D</strong>Social</a>
  <small className="navbar-text ms-auto ">
    {props.account}
</small>  
</nav>
</div>;
}

export default Navbar;
