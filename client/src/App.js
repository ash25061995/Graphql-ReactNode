import React,{useState} from 'react';



//components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Carousel from './components/carousel/Carousel';


function App() {


  const[toggleMode,setToggleMode]=useState(false);
  const themeHandler=()=>{
    setToggleMode(!toggleMode);
    let root=document.documentElement;
    if(toggleMode){
      root.style.setProperty("--bg", "white");
      root.style.setProperty("--color", "black");
      root.style.setProperty("--bdr-color", "black");
      root.style.setProperty("--btn-bg", "black");
      root.style.setProperty("--btn-color", "white");
    }else{
      root.style.setProperty("--bg", "black");
      root.style.setProperty("--color", "white");
      root.style.setProperty("--bdr-color", "white");
      root.style.setProperty("--btn-bg", "white");
      root.style.setProperty("--btn-color", "black");
    }
  }


  return (
    <div className="App">
      <button className="theme-btn" onClick={themeHandler}><i class="fas fa-toggle-on fa-5x"></i></button>
      <Carousel/>
      <AddBook/>
      <BookList/>
    </div>
    
  );
}

export default App;
