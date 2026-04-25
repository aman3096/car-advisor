import './App.css'
import { Onboarding } from './components/Onboarding'

function App() {

  return (
    <>
      <section id="center">
        <div className="hero">
     
        </div>
        <div>
            <h1>Welcome to the car-service's platform</h1>
            <h2>Give your budget, brand and year make of the car so we can suggest you the top 3 cars, based on the data we have</h2>
          <p>
            <Onboarding />
          </p>
        </div>
      </section>
    </>
  )
}

export default App
