import React from 'react'
import "../style/Home.css"
import Post from '../components/Post'

const Home = () => {
  return (
    <div className='main home'>
      <div className="mid-page">
        <div className="for-you-following">
          <div className="for-you">
            For You
          </div>
          <div className="following">
            Following
          </div>
        </div>
        <div className="posts">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <div className="right-page">
        <div className='interior-right-page'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae est veritatis aliquid culpa nobis facilis eveniet iusto sit ullam nam, odio, quis repellat eos reiciendis deleniti pariatur a facere, recusandae non. Sed officiis, illum laborum voluptatibus ex unde temporibus, animi quas assumenda similique rerum, deserunt alias. A odit impedit repellendus delectus veniam consequuntur, et mollitia doloribus deserunt distinctio, tenetur, harum maiores aliquam in sed animi voluptatibus! Sed odit nostrum, dolorem dignissimos aspernatur officia tenetur, iste corrupti suscipit nam, alias autem? Adipisci beatae enim cupiditate expedita dolor, quos animi. Rem, perferendis iusto? Quod, voluptate eveniet sed minus totam illum. Sint dignissimos commodi sunt, vel non pariatur eaque consectetur quos temporibus, voluptate aut atque hic totam? Incidunt corporis accusantium quis nulla voluptates sapiente dolore, labore nesciunt beatae libero saepe sit, temporibus esse numquam quibusdam molestiae tenetur? Veniam sint officia officiis eius debitis consequatur blanditiis quae iusto fuga animi voluptatem atque, itaque consequuntur reprehenderit, minus architecto, aliquam tempore ducimus distinctio quos vel perspiciatis sit velit quaerat. Nulla exercitationem, blanditiis labore a ipsam optio facilis perferendis, culpa inventore accusamus enim aliquam libero numquam nostrum, ut harum facere quasi amet! Deserunt, odit. Unde obcaecati incidunt ratione fuga ex deleniti? Expedita fugiat error eaque, maxime tenetur eos voluptatibus magnam modi quisquam laudantium officia nam sed, repudiandae culpa tempore assumenda cumque itaque animi? Officia provident natus vero, deleniti quos rerum fugiat aperiam est quam pariatur laborum perferendis quaerat praesentium, ex omnis, quas debitis. Fugit, quis! Repudiandae nisi voluptas quam fuga sit consectetur aut sed! At, iusto? Dolorum.
        </div>
      </div>
    </div>
  )
}

export default Home
