import { useEffect, useState } from "react";
import CoinDetails from "../components/coindetails/CoinDetails";
import { useParams } from "react-router-dom";

function CoinDetailsContainer() {

    const { coinId } = useParams();
    const [coinData, setCoinData] = useState(null);
    const [chartData, setChartData] = useState(null);
    

    async function coinDetails() {
            try {
                const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinId}`,
                {
                headers: {
                    "x-cg-demo-api-key": "CG-G7oGpXXjKPK11jhGuWkFFSpb"
                    }
                }
            );
                const coinDetail = await response.json();
                // console.log(coinDetail)
                setCoinData(coinDetail)
    
                const chartResponse = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=7`,
                    {
                        headers: {
                            "x-cg-demo-api-key": "CG-G7oGpXXjKPK11jhGuWkFFSpb"
                        }
                    }
                );
                const chartJson = await chartResponse.json();
                // console.log(chartJson)
                const labels = chartJson.prices.map((p) => {
                    const date = new Date(p[0]);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
            });
                
                const prices = chartJson.prices.map(p => p[1]);
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Price (INR)",
                            data: prices,
                            borderColor: "#4caf50",
                            backgroundColor: "rgba(76, 175, 80, 0.1)" 
                        }
                    ]
                })
                
            } catch (err) {
                console.err(err);
            } 
            
    }
    
        useEffect(() => {
            coinDetails();
        }, [coinId])
    
    return (
        <CoinDetails coinData={coinData} chartData={ chartData} />
    )
    
    
}
export default CoinDetailsContainer;