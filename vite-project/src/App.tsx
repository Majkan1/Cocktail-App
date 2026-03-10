import { useEffect,useState } from 'react'
import './App.css'

function App() {
  return (
    <>
    <Header/>
    <Parent/>
    </>
  )
}

interface SingleCocktail {
  id:number,
  name:string,
  glass:string,
  category:string,
  instructions:string,
  alcoholic:boolean,
  imageUrl:string
}

interface CocktailProps {
  dane:SingleCocktail[],
  setDane:(value:SingleCocktail[]) => void
}

function Parent(){
  const [dane,setDane] = useState<SingleCocktail[]>([]);
    useEffect(()=>{
   const FetchCoctails = async  () =>{
    try {
      const data = await fetch('https://cocktails.solvro.pl/api/v1/cocktails?page=1&perPage=50');
      const res = await data.json();
      setDane(res.data);
    }
    catch (e) {
      console.log(e);
    }
    };
    FetchCoctails();
  },[setDane]);
  return(
    <>
    <Api dane = {dane} setDane = {setDane}/>
    </>
  )
}

function Header(){
  return (
    <div className='Header'>
      <div><nav>Home</nav></div>
      <div>
        <input className='Search-bar'
        placeholder='Search a cocktail'
        />
      </div>
      <div className='Numbers'>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
      </div>
    </div>
  )
}

function Api({dane}:CocktailProps){
  return (
    <div>
      <div className='grid-elements'>
        {dane.map((item)=>(
          <div key={item.id} className='card'>
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.glass}</p>
            <p>{item.alcoholic ? 'Alcoholic' : 'Non-alcoholic'}</p>
            <img src={item.imageUrl} alt={item.name}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App