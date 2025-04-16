export default function IncredianceList(props){
    
    
    const listItems=props.items.map((item)=>{
        return <li key={item}>{item}</li>
    })
    return(
        <section>
                {props.items.length==0 && <h2>Add increadience</h2>}
                {props.items.length!=0 && <h2>Increadience:</h2>}
                <ul className="increadience-list">
                    {listItems}
                </ul>
                {
                    props.items.length >3 &&
                    <div className="get-recipy-container">
                        <div>
                            <h4>Ready for a recipy?</h4>
                            <p>Generate a recipy from the list of items</p>
                        </div>
                        <button className="generate" onClick={props.generate}>generate</button>
                    </div>
                }
            </section>
    )
}