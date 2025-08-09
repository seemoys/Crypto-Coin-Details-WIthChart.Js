import { BrowserRouter, Route, Routes } from "react-router-dom"
import CryptoContainer from "./api/CryptoContainer"
import CryptoList from "./components/cryptolist/CryptoList"
import CoinDetailsContainer from "./api/CoinDetailsContainer"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CryptoContainer />}/>
        <Route path="/coin/:coinId" element={<CoinDetailsContainer />}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
