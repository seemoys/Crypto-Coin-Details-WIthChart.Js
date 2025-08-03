import { BrowserRouter, Route, Routes } from "react-router-dom"
import CryptoContainer from "./api/CryptoContainer"
import CryptoList from "./components/cryptolist/CryptoList"
import CoinDetails from "./components/coindetails/CoinDetails"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CryptoContainer />}/>
        <Route path="/coin/:coinId" element={<CoinDetails />}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
