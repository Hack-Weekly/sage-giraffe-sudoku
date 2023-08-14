import { useEffect } from 'react';
import './App.css';

function MyComponent() {
    useEffect(() => {
    const root = document.documentElement;
    //root (html element) defualt class name is light
    root.className = "light";
    const themeButton = document.querySelector(".toggle-theme");
    themeButton.addEventListener("click", ()=> {
        //change root classname to dark if its already on light mode
        if(root.className === "light"){
            root.className = "dark"
        }
        //change root name back to light if the classname is dark
        else{
            root.className = "light";
        }
    
    })
    }, []);

}

export default MyComponent;
