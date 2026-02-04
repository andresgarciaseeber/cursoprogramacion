import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ServicesScreen from './screens/ServicesScreen/ServicesScreen'
import SupportScreen from './screens/SupportScreen/SupportScreen'
import ContactScreen from './screens/ContactScreen/ContactScreen'

function App (){
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/services" element={<ServicesScreen />} />
        <Route path="/support" element={<SupportScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
      </Routes>
    </>
  )
}

export default App