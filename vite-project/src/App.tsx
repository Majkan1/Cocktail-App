import { useEffect,useState } from 'react'
import { Routes, Route, Navigate, Link, useParams } from 'react-router-dom';
import './App.css'

function App() {
  return (
      <Routes>
        <Route path="/page/:pageId" element={<Parent />} />
        <Route path="*" element={<Navigate to="/page/1" replace />} />
      </Routes>
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
  favoriteIds:number[],
  onToggleFavorite:(cocktailId:number)=>void
}

interface HeaderProps {
  name:string,
  setName:(value:string)=>void,
  pages:number[]
}

function Parent(){
  const [name,setName] = useState('');
  const { pageId } = useParams();
  const [dane,setDane] = useState<SingleCocktail[]>([]);
  const [favs, setFavs] = useState<number[]>(JSON.parse(localStorage.getItem('favoriteCocktailIds') || '[]'));

  useEffect(() => {
    localStorage.setItem('favoriteCocktailIds', JSON.stringify(favs));
  }, [favs]);

  const handleToggleFavorite = (cocktailId:number) => {
    let arr = [...favs];
    if(arr.includes(cocktailId)){
      arr = arr.filter((id) => id !== cocktailId);
    } else {
      arr.push(cocktailId);
    }
    setFavs(arr);
  };
  
  useEffect(()=>{
   const FetchCoctails = async  () =>{
    try {
      
      const response1 = await fetch('https://cocktails.solvro.pl/api/v1/cocktails?page=1&perPage=250');
      const data1 = await response1.json();
      
      const allCocktails = [
        ...data1.data
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
  const pages = [1, 2, 3, 4, 5,6];

  return(
    <div className='page-shell'>
      <Header name = {name} setName = {setName} pages={pages}/>
      <Api
      dane={currentCocktails}
      favoriteIds={favs}
      onToggleFavorite={handleToggleFavorite}
      />
    </div>
  )
}

function Header({name,setName,pages}:HeaderProps){
  return (
    <header className='Header'>
      <div>
        <nav>
          <Link to="/page/1" className='home-link'>Cocktail Atlas</Link>
        </nav>
      </div>
      <div className='search-wrap'>
        <input className='Search-bar'
        placeholder='Search a cocktail'
        value = {name}
        onChange = {(e)=>setName(e.target.value)}
        />
      </div>
      <div className='Numbers'>
        {pages.map((page)=>(
          <Link key={page} to={`/page/${page}`}>{page}</Link>
        ))}
      </div>
    </header>
  )
}

function Api({dane, favoriteIds, onToggleFavorite}:CocktailProps){
  return (
    <main className='content-area'>
      <div className='grid-elements'>
        {dane.map((item)=>(
          <div key={item.id} className='card'>
            <div className='upper-one'>
              <div className='above'>
                <p className='favorite-label'>Favorite</p>
                <input
                type = "checkbox"
                checked={favoriteIds.includes(item.id)}
                onChange={() => onToggleFavorite(item.id)}
                />
              </div>
            </div>
            <p className='drink-name'>{item.name}</p>
            <img  src={item.imageUrl} alt={item.name}/>
            <p className='ingredients'>Ingredients: {item.ingredients?.map(i=>i.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
