import axios from 'axios'
import { useState } from 'react'

function App() {
  const [meals, setMeals] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState('')
  const [search, setSearch] = useState(null)
  const [welcomeTxt, setWelcomeTxt] = useState('Welcome To Hungry Spoon! Find Your next meal :)')


  async function GetMeal() {

    setMeals([])
    setWelcomeTxt('Finding Recipes...')


    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      const data = response.data.meals
      setMeals(data)
      setWelcomeTxt(null)
    }
    catch (err) {
      console.log('Error')
    }

  }

  return (
    <section className=''>
      <header className='w-full bg-[#1b1c1c] text-white px-3'>
        <nav className='flex justify-center md:justify-between items-center flex-col md:flex-row py-6 max-w-7xl mx-auto gap-6'>
          <div className="logo">
            <img src="/logo.png" alt="" className='max-w-[90px]' />
          </div>
          <div className="search flex flex-col md:flex-row items-center justify-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search Recipe..."
              className="outline outline-white/30 focus:outline-[#f8efe0]/80 rounded-md px-4 py-2 text-white/75 w-full md:w-auto"
              onChange={(e) => { setSearch(e.target.value) }}
              onKeyDown={(e) => { if (e.key === 'Enter') { GetMeal() } }}
            />
            <button
              onClick={GetMeal}
              className='bg-[#7b4a0b] px-5 py-2 rounded-md cursor-pointer w-full'>
              Search
            </button>
          </div>
        </nav>
      </header>
      <div className="app-content-main max-w-7xl mx-auto px-3 py-4 text-[#141515]">



        <h1 className='text-xl md:text-3xl text-center'>{welcomeTxt}</h1>

        <div className='max-w-7xl mx-auto p-3 grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10'>
          {meals.map((meal, i) => (
            <div className='card-main shadow-[8px_8px_25px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden max-w-[350px] place-self-center-safe text-[#141515]/80 bg-[#f8efe0] cursor-pointer transition-all duration-250 hover:-translate-y-1' key={i}>
              <img src={meal.strMealThumb} className='object-cover' />
              <div className="p-3 text-center">
                <h1 className='text-xl lg:text-2xl font-bold'>{meal.strMeal}</h1>
                <h2 className=''>{meal.strArea} Dish</h2>
                <h2 className=''><span className='font-bold'>Category:</span> {meal.strCategory}</h2>
                <button onClick={() => { setIsOpen(true), setIndex(i) }} className='bg-[#7b4a0b] px-5 py-2 mt-3 rounded-md cursor-pointer text-white'>Show Recipe</button>
              </div>
            </div>
          ))}

          {isOpen &&
            <div className="overlay fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="overlay-content bg-[#7b4a0b] text-[#f8efe0] px-2 py-6 text-center relative flex flex-col items-center max-w-[90vw] lg:max-w-[60vw] w-full max-h-[85vh] overflow-y-auto rounded-xl">

                <button
                  onClick={() => setIsOpen(false)}
                  className='absolute right-4 top-4 font-bold text-3xl cursor-pointer text-gray-100 hover:text-gray-300'
                >
                  <h1 className="bi bi-x"></h1>
                </button>

                <h1 className="text-2xl font-semibold mb-4">{meals[index].strMeal}</h1>
                <img
                  src={meals[index].strMealThumb}
                  alt={`${meals[index].strMeal} Image`}
                  className='max-w-[250px] object-cover md:max-w-[300px] rounded-2xl mb-4'
                />

                <h1 className="text-2xl mb-2 text-[#141515] font-bold">Ingredients</h1>
                <ul className='text-start list-disc'>
                  {[...Array(20)].map((_, i) => {
                    const ingredients = meals[index][`strIngredient${i + 1}`];
                    const measure = meals[index][`strMeasure${i + 1}`];
                    if (ingredients && ingredients.trim() !== '') {
                      return <li key={i}>{ingredients} - {measure}</li>
                    }
                  })}
                </ul>

                <h1 className="text-2xl mt-4 mb-2 text-[#141515] font-bold">Instructions</h1>
                <p className='font-light'>{meals[index].strInstructions}</p>

                <h1 className='text-2xl mt-4 mb-1 text-[#141515] font-bold'>
                  Video Tutorial
                </h1>
                <a href={meals[index].strYoutube} target='_blank' className='underline'>Click Here</a>

                <div className="flex flex-row items-center gap-4 mt-6">
                  <h2 className='font-bold'>Category: <span className='font-light'>{meals[index].strCategory}</span></h2>
                  <h2> | </h2>
                  <h2 className='font-bold'>Origin: <span className='font-light'>{meals[index].strArea}</span></h2>

                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  )

}

export default App
