import { useEffect,useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useParams } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/page/:pageId" element={<Parent />} />
        <Route path="*" element={<Navigate to="/page/1" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

interface Ingredient {
  name:string
}
interface SingleCocktail {
  id:number,
  name:string,
  glass:string,
  category:string,
  instructions:string,
  alcoholic:boolean,
  imageUrl:string,
  ingredients:Ingredient[]
}

interface CocktailProps {
  dane:SingleCocktail[],
  setDane:(value:SingleCocktail[]) => void
}

interface HeaderProps {
  name:string,
  setName:(value:string)=>void
}

function Parent(){
  const [name,setName] = useState('');
  const { pageId } = useParams();
  const [dane,setDane] = useState<SingleCocktail[]>([]);
  
  useEffect(()=>{
   const FetchCoctails = async  () =>{
    try {
      
      const response1 = await fetch('https://cocktails.solvro.pl/api/v1/cocktails?page=1&perPage=50');
      const data1 = await response1.json();

      const response2 = await fetch('https://cocktails.solvro.pl/api/v1/cocktails?page=2&perPage=50');
      const data2 = await response2.json();

      const response3 = await fetch('https://cocktails.solvro.pl/api/v1/cocktails?page=3&perPage=50');
      const data3 = await response3.json();

      const response4 = await fetch('https://cocktails.solvro.pl/api/v1/cocktails?page=4&perPage=50');
      const data4 = await response4.json();

      const response5 = await fetch('https://cocktails.solvro.pl/api/v1/cocktails?page=5&perPage=50');
      const data5 = await response5.json();
      
      const allCocktails = [
        ...data1.data, 
        ...data2.data, 
        ...data3.data, 
        ...data4.data, 
        ...data5.data
      ];

      const  List= await Promise.all(
        allCocktails.map(async (cocktail) => {
          const res = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails/${cocktail.id}`);
          const json = await res.json();
          return json.data;
        })
      );
      setDane(List);
    }
    catch (e) {
      console.log(e);
    }
    };
    
    FetchCoctails();
  },[]);

  const filterCocktails = dane.filter((item)=>item.name.toLowerCase().includes(name.toLowerCase()))
  
  const currentPage = parseInt(pageId || '1');
  const startIndex = (currentPage - 1) * 50;
  const currentCocktails = filterCocktails.slice(startIndex, startIndex + 50);

  return(
    <>
      <Api dane={currentCocktails} setDane={setDane}/>
      <Header name = {name} setName = {setName}/>
    </>
  )
}

function Header({name,setName}:HeaderProps){
  return (
    <div className='Header'>
      <div><nav><Link to="/page/1" style={{color: 'white', textDecoration: 'none'}}>Home</Link></nav></div>
      <div>
        <input className='Search-bar'
        placeholder='Search a cocktail'
        value = {name}
        onChange = {(e)=>setName(e.target.value)}
        />
      </div>
      <div className='Numbers' style={{display: 'flex', gap: '10px'}}>
        <Link to="/page/1">1</Link>
        <Link to="/page/2">2</Link>
        <Link to="/page/3">3</Link>
        <Link to="/page/4">4</Link>
        <Link to="/page/5">5</Link>
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
            <div className='upper-one'>
              <p>{item.id}</p>
              <div className='above'>
                <p>Ulubiony</p>
                <input
                type = "checkbox"
                />
              </div>
            </div>
            <p style={{margin:'2px'}}>{item.name}</p>
            <p style={{margin:'2px'}}>Category:{item.category}</p>
            <p style={{margin:'2px'}}>Glass:{item.glass}</p>
            <p style={{margin:'2px'}}>{item.alcoholic ? 'Alcoholic' : 'Non-alcoholic'}</p>
            <img  src={item.imageUrl} alt={item.name}/>
            <p style={{margin:'2px'}}>{item.ingredients?.map(i=>i.name).join(',')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App