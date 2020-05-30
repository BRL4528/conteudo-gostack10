import React, { Component } from 'react';

import Post from './Post'

class PostList extends Component {
    state = {
        posts: [
          {
            id: 1,
            author: {
              name: "Rhiana",
              avatar:  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQz2wTkksE1EPm9AlJEEVRQ7uX3wg1cj8e4C0PV5pgnvYHeMBEP"
            },
            date: "04 Jun 2019",
            content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
            comments: [
              {
                id: 1,
                author: {
                  name: "Miahh",
                  avatar: "https://3.bp.blogspot.com/-SUMDWwWqIxY/WU09d85GLFI/AAAAAAAAJAY/YmcGzxZOI9ME2ls-VVIzM2N2KDgnHJGegCLcBGAs/s1600/mia-khalifa-photos-again1.jpg"
                },
                content: "Ela sempre está contrando, basta você ser persistente e focado!"
              }
            ]
          },
          {
            id: 2,
            author: {
              name: "Charlis",
              avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTSZb4vghpOK4r50eDpwJzV1HBlEkn8B-lshvPeV-GTvXd_WuvY"
            },
            date: "04 Jun 2019",
            content: "Alguem pra alugar um relógio ai?",
            comments: [
              {
                id: 2,
                author: {
                  name: "Jorginho",
                  avatar: "https://i.pinimg.com/originals/23/ed/73/23ed73f7103c9746a842a3f7239691f2.jpg"
                },
                content: "Eu tenho Cara, R$ 40 conto"
              },
              {
                id: 3,
                author: {
                  name: "FaFaBio",
                  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyW-qYcEsmER_H59qCw87RgDDEXD7tPm2ceioKKYJrii3Zxzyw"
                },
                content: "Isso é um absurdo!!"
              }
            ]
          },

          
          
          
        ]
      };
  
    render(){
        
        const { posts } = this.state
        console.log()
       return (
            <>
              {posts.map(post => (<div className="listPost"  > <Post key={post.id} {...post} /> </div>))}
              
            </>
             
       )
       
    }
    
}
export default PostList;