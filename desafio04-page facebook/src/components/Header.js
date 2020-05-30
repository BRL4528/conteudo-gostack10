import React, { Component } from 'react';

import facebook from '../assets/facebook.png'
import userimg from '../assets/user.png'


class Header extends Component {
    
   render(){
       return(
           <header>
               <img className="face" src={facebook}/>
               <div className="textUser" >
               <strong  className="perfil" >Meu Perfil</strong>
            
               <img className="user"  src={userimg}/>
               </div>
            
           </header>
       )
   }
}

export default Header;