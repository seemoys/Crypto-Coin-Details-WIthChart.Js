import { useEffect, useState } from "react";
import CryptoList from "../components/cryptolist/CryptoList";

function CryptoContainer() {

    const [coins, setCoins] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fetchTime, SetFetchTime] = useState(null);
  
 
  async function fetchCoins() {
      try {
        const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr",
        {
          headers: {
            "x-cg-demo-api-key": "CG-G7oGpXXjKPK11jhGuWkFFSpb"
          }
        }
      );
      const coinData = await response.json();
        setCoins(coinData);
        setLoading(false);
        SetFetchTime(new Date().toLocaleTimeString())
      } catch (err) {
        console.err(err);
        setError(true);
      } finally {
        setLoading(false);
      }
      
  }
    useEffect(() => { 
      fetchCoins();
    }, []);
    
    const filteredCoinsDetails = coins?.filter((coin) => {
        return coin?.name.toLowerCase().includes(searchText.toLowerCase())|| coin?.symbol.toLowerCase().includes(searchText.toLowerCase()) || coin?.current_price.toString().includes(searchText.toLowerCase());
    })

    return (
        <CryptoList
            searchText={searchText}
            filteredCoinsDetails={filteredCoinsDetails}
            onSearchChange={(e) => setSearchText(e.target.value)}
            loading={loading}
            error={error}
            onRefresh={fetchCoins}
            fetchTime={fetchTime}
        />
    )
    
}

export default CryptoContainer;