  import "./ShimmerCoinDetails.css"

function ShimmerForCoinDetails({ number }) {
    console.log(number + "Kali")
        return(
     <>
    {[...Array(number)].map((_,idx) => (
      <div key={idx} className="shimmer-eth-card">
      <div className="shimmer-eth-header">
        <div className="shimmer shimmer-eth-logo" />
        <div>
          <div className="shimmer shimmer-eth-title" />
          <div className="shimmer shimmer-eth-row" style={{ width: 160 }} />
        </div>
      </div>
      <div style={{display:"flex"}}>
            <div className="shimmer-eth-body">
            <div className="shimmer shimmer-eth-row" />
            <div className="shimmer shimmer-eth-row shimmer-eth-row-short" />
            <div className="shimmer shimmer-eth-row" />
            <div className="shimmer shimmer-eth-row shimmer-eth-row-short" />
            <div className="shimmer shimmer-eth-row" />
       </div>
      <div className="shimmer-eth-content">
        <div className="shimmer shimmer-eth-chart" />
      </div>
      </div>
    </div>
    ))}
  </>
        )
    
}
export default ShimmerForCoinDetails;