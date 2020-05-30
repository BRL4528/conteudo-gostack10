import React from 'react';

import PostCommit from './Comments';

 function PostTest({author, date, comments, content}) {
  return (
    <div className="diviInteContainePost" >
      <div className="diviSpaceImg" >
      <img className="imgPost" src={author.avatar} ></img>
      <div className="divStrong" >
      <strong>{author.name}</strong>
      </div>

     <div className="divData">
     <label className="dataPost" >{date}</label>
     </div>
   
     </div>
     <div>
     <label>{content}</label>
     </div>
 
   <div>
   <label>{<PostCommit comments={comments} />}</label>  
   </div>

    </div>
  );
}

export default PostTest