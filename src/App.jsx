import React from 'react'
import TopSection from './section/TopSection.jsx';
import MusicSection from './section/MusicSection.jsx';


const App = () => {
  return (
    <main className='bg-darkBlue min-h-screen'>
      <TopSection />
      <section className='xl:padding-l wide:padding-r padding-b'>
       <MusicSection />
      </section>
    </main>
  )
}


export default App;