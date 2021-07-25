import React, { useEffect } from 'react';
import './App.css';
import Post from './Post';
import { useState } from 'react';
import { auth, db } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import logo from './logo.png';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSignIn, setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const unSubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser)
        if(authUser.displayName){
          //if they have username dont update
        }
        else{
          return authUser.updateProfile({
            displayName: username,
          });
        }
      }
      else{
        setUser(null);
      }
    })
    return()=>{
      unSubscribe();
    }
  },[username,user])

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>doc.data()));
    })
  },[]);

  const signUp=(event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error)=>alert(error.message));
  }

  const signIn=(event)=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))
    setOpenSignIn(false);

  }

  return (
    <div className="App">
      
     

    <Modal
        open={open}
        onClose= {()=>setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
      
        <Input type="text"
        placeholder="username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}/>

        <Input type="email"
        placeholder="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>

        <Input type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>

        <Button onClick={signUp}>Signup</Button>
      
        </form>

    </div>
    </Modal>

    <Modal
        open={openSignIn}
        onClose= {()=>setOpenSignIn(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">

        <Input type="email"
        placeholder="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>

        <Input type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>

        <Button onClick={signIn}>Signin</Button>
      
        </form>

    </div>
    </Modal>

    <div className="app__header">
            <img src={logo} alt="instagram logo"/>
            {user ?(
              <Button onClick={()=>auth.signOut()}>Logout</Button>
            ):(
             <div className="app__logincontainer">
               <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
               <Button onClick={()=>setOpen(true)}>Sign Up</Button>
             </div> 
            
            )}

        </div>
      {
        posts.map((post)=>(
          <Post imageUrl={post.imageUrl} 
          username = {post.username}
          caption = {post.caption}/>
        ))
      }

{user?.displayName ? (
        <ImageUpload username={user.displayName}/> 
      ):(
        <h3>Sorry you need to log in</h3>
      )}
    </div>
  );
}

export default App;
