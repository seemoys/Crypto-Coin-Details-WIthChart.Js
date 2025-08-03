  import "./Shimmer.css"
  function Shimmer({ number }) {
      return (
          <>
              <div className="shimmer-body">
                  {[...Array(number)].map((_,index) => {
                      return(
                    <div className="shimmer-row" key={index}>
                        <div className="shimmer-wrapper cell-logo">
                          <div className="shimmer" />
                        </div>
                        <div className="shimmer-wrapper shimmer-cell cell-name">
                          <div className="shimmer" />
                        </div>
                        <div className="shimmer-wrapper shimmer-cell cell-symbol">
                          <div className="shimmer" />
                        </div>
                        <div className="shimmer-wrapper shimmer-cell cell-price">
                          <div className="shimmer" />
                        </div>
                        <div className="shimmer-wrapper shimmer-cell cell-marketcap">
                          <div className="shimmer" />
                        </div>
                    </div>
                ) })}
                </div>
          </>
      )
  }
  export default Shimmer;