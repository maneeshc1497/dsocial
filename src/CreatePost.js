import React,{useState} from 'react';
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import './CreatePost.css'
function CreatePost(props) {
    const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(null)
  const onhandleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var imageUrl = URL.createObjectURL(e.target.files[0]);
      var imgPreview=document.getElementById("image_preview");
      imgPreview.src=imageUrl;
      imgPreview.style.display= "block";
      const file = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = ()=>{
        setBuffer(Buffer(reader.result))
        
        }
    }
  };
  const onsubmitHandler =(e)=>{
    if(text)
    {
      if(image)
      {
        e.preventDefault();
        props.uploadVideo(text,buffer) ;
        setProgress(0);
        setText("");
        var imgPreview=document.getElementById("image_preview");
        imgPreview.src="";
      }else{
        alert('Select a image to post!!');  
      }
    }else{
      alert('Enter your Caption!!');
    }
    
  }

  return <div>
      <div className="createpost">
          <div className="createpost_loggedin">
            <p>Create Post </p>
            <div className="createpost_loggedinCenter">
              <textarea
                className="createpost_textArea"
                rows="3"
                placeholder="enter your caption here.."
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              ></textarea>
              <div className="createpost_imagePreview">
                <img id="image_preview"  alt="" />
              </div>
            </div>

            <div className="createpost_loggedinBottom">
              <div>
                <label className="createpost_addImage" htmlFor="imgInput">
                  <AddAPhotoIcon />
                </label>

                <input
                  id="imgInput"
                  type="file"
                  accept="image/*"
                  onChange={onhandleImage}
                />
              </div>
              <button
                className="createpost_uploadBtn"
                onClick={onsubmitHandler}               
                disabled={text ? false:true}
                
              >
               {`Upload ${progress !=0 ? progress: ""}`} 
              </button>
            </div>
          </div>
        </div>
  </div>;
}

export default CreatePost;
