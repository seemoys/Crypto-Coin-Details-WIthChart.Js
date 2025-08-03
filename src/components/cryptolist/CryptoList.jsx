import DataTable, { createTheme } from "react-data-table-component";
import { useTheme } from "../../context/ThemeContext";
import Shimmer from "../shimmer/Shimmer";
import { MdDarkMode ,MdOutlineDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Optional: Define a clean theme
createTheme('cryptoTheme', {
  text: {
    primary: '#8e98abff',
    secondary: '#718096',
  },
  background: {
    default: '#1b374bff',
  },
  context: {
    background: '#e2e8f0',
    text: '#1a202c',
  },
  divider: {
    default: '#5f81aeff',
  },
});

function CryptoList({ searchText,filteredCoinsDetails,onSearchChange,loading,error,onRefresh,fetchTime}) {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
    
  const columns = [
    {
      name: <b style={{fontSize:"25px",fontFamily:"cursive"}}>Logo</b>,
      selector: row => (
        <img src={row.image} alt={row.name} width="35" height="35" style={{ borderRadius: '5%' }} />
      ),
      width: "100px"
    },
    {
      name: <b style={{fontSize:"25px",fontFamily:"cursive"}}>Name</b>,
      selector: row => row.name,
        sortable: true,
      font: "100px"
    },
    {
    name: <b style={{fontSize:"25px",fontFamily:"cursive"}}>Symbol</b>,
      selector: row => row.symbol.toUpperCase(),
      sortable: true,
    },
    {
      name: <b style={{fontSize:"25px",fontFamily:"cursive"}}>Price </b>,
      selector: row => `₹${row.current_price.toLocaleString()}`,
      sortable: true,
    },
    {
      name: <b style={{fontSize:"25px",fontFamily:"cursive"}}>Market Cap</b>,
      selector: row => `₹${row.market_cap.toLocaleString()}`,
      sortable: true,
    },
    ];
    
    const customStyles = {
        rows: {
            style: {
            backgroundColor: isDark ? "#2d3748" : "#ffffff",
            color: isDark ? "#f0f0f0" : "#1a202c",
            },
            highlightOnHoverStyle: {
            backgroundColor: isDark ? "#3a4756" : "#f0f0f0",
            color: isDark ? "#ffffff" : "#1a202c",
            cursor: "pointer",
            transition: "all 0.3s ease",
            },
        },
        striped: {
            style: {
            backgroundColor: isDark ? "#1f2937" : "#f9f9f9",
            },
        },
        headCells: {
            style: {
            backgroundColor: isDark ? "#4a5568" : "#b5c6d7ff",
            color: isDark ? "#ffffff" : "#26303cff",
            fontWeight: "bold",
            fontSize: "18px",
            },
        },
        };

    return (
        <>
        
            {error && <p style={{ textAlign: 'center' }}>Error coins...</p>}
        {loading ? <Shimmer number={10} /> : (
          <div style={{width:"100%",minHeight: "100vh",backgroundColor: isDark ? "#1a202c" : "#f7fafc",color: isDark ? "#f0f0f0" : "#1a202c",transition: "background-color 0.3s ease, color 0.3s ease",
        }}>
          {fetchTime && (
            <div style={{ textAlign: "center",position:"fixed",top:"50px",left:"35rem", fontWeight: "semi-bold" }}>
              Data fetched at: {fetchTime}
            </div>
          )}
            <button onClick={toggleTheme} style={{ position: "absolute", top: "38px", left:"71.7rem", borderRadius: "8px", height:"30px", background: isDark ? "#e2e8f0":"#4a5568" , color: isDark ?  "#1a202c":"#f0f0f0" , border: "none", cursor: "pointer",
                }}
            >
            {isDark ? <MdOutlineDarkMode /> : <MdDarkMode />}
                </button>
                <button onClick={onRefresh} style={{ position: "absolute", top: "38px", left:"67rem", borderRadius: "8px", height:"30px", background: isDark ? "#e2e8f0":"#4a5568" , color: isDark ?  "#1a202c":"#f0f0f0" , border: "none", cursor: "pointer",
                }}
                >
                    Refresh
            </button>

            {loading && <p style={{ textAlign: "center" }}>Loading coins...</p>}
            {error && <p style={{ textAlign: "center" }}>Error loading coins.</p>}

            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px", backgroundColor: isDark ? "#2d3748" : "lightblue"
                }}
            >
            <input style={{ width: "25%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "20px", position: "relative", left: "45.2rem", top: "4rem", zIndex:"1"
            }} type="text" value={searchText} placeholder="Search" onChange={onSearchChange}
            />

            <DataTable
             title="Crypto Market (USD)"
             columns={columns}
             data={filteredCoinsDetails}
             pagination
             highlightOnHover
             // striped
             responsive
             theme="cryptoTheme"
             customStyles={customStyles}
             onRowClicked={(row)=>navigate(`/coin/${row.id}`)}
            />
            </div>
        </div>)}
        

    </>
  );
}

export default CryptoList;
