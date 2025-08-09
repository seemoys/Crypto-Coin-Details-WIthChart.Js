
import { Line } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend
} from 'chart.js';
import ShimmerForCoinDetails from "../shimmer/ShimmerForCoinDetails";
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

    function CoinDetails({coinData,chartData}) {
        
        if (!coinData) return <div>{<ShimmerForCoinDetails number={2} />}</div>;
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