import React from 'react';


function PostCommit({ comments }) {
    return (
      <div className="divContainerCommit" >
               
               <div className="MargemBotton" ></div>
             {comments.map(comment => <div className="divCommitAjust" key={comment.id}>
             <div className="divCommit" > 
                <img className="imgPostCommit" src={comment.author.avatar} ></img>
           
           
              <strong>{comment.author.name}</strong>
              <label>{comment.content}</label></div>
        </div>)}
      </div>
    )
}


export default PostCommit