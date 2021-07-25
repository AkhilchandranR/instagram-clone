import { Button } from '@material-ui/core'
import React,{ useState } from 'react'
import { db,storage } from './firebase';
import './ImgeUpload.css';

function ImageUpload({username}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    const handleUpload=()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred/
                    snapshot.totalBytes)*100);
                setProgress(progress);
            },
            (error)=>{
                console.log(error);
            },
            ()=>{
                storage.ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    //post image in db
                    db.collection("posts").add({
                        imageUrl: url,
                        caption: caption,
                        username: username
                    });
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                })            
            }
        )
    }

    return (
        <div className="image__upload">
            <progress value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption" value={caption} onChange={Event=>setCaption(Event.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <Button className="imageuplaod__button" onClick={handleUpload}>
                upload
            </Button>
        </div>
    )
}

export default ImageUpload
