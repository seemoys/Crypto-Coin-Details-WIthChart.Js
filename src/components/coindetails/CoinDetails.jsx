import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend
} from 'chart.js';
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

    function CoinDetails() {
        
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
        if (!coinData) return <div>Loading...</div>;
        return (

            <>
                {coinData && (
                
                <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
                    <h1>{coinData?.name} ({coinData.symbol.toUpperCase()})</h1>
                        <img src={coinData.image.large} alt={coinData.name} width="80" />
                        <div
                        className="chart-container"
                        style={{border: "1px solid grey",height: "290px",margin: "20px 0",width:"525px",display: "flex",alignItems: "center",justifyContent: "center",background: "#fff",position: "absolute",left: "520px",top:"70px"
                        }}
                    >
                        {chartData && <Line data={chartData} />}
                    </div>

                    <p><strong>Market Cap Rank:</strong> #{coinData.market_cap_rank}</p>
                    <p><strong>Current Price (INR):</strong> ₹{coinData.market_data.current_price.inr.toLocaleString()}</p>
                    <p><strong>Market Cap:</strong> ₹{coinData.market_data.market_cap.inr.toLocaleString()}</p>
                    <p><strong>Genesis Date:</strong> {coinData.genesis_date || 'N/A'}</p>
                    <p>
                        <strong>Homepage:</strong>{" "}
                        <a href={coinData.links.homepage[0]} target="_blank" rel="noreferrer">
                        {coinData.links.homepage[0]}
                        </a>
                    </p>
                    <p><strong>Description:</strong></p>
                        <p>{coinData.description.en}</p>
                </div>
       ) }
            </>
            
        )
    }
    export default CoinDetails;