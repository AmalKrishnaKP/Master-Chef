export default function GetRecipy(){
    return(
        <div className="get-recipy-container">
            <div ref={recitySection}>
               <h4>Ready for a recipy?</h4>
               <p>Generate a recipy from the list of items</p>
            </div>
            <button className="generate" onClick={generate}>generate</button>
        </div>
    )
}