
const ScrollChart=({value,color})=>{

    return (
        <div style={{width:"65%",height:"22px",backgroundColor:"white",borderRadius:"15px",marginRight:"10px"}}><div style={{width:`${value}%`,backgroundColor:`${color}`,height:"100%",borderRadius:"15px"}}></div></div>
    );
}

export default ScrollChart;