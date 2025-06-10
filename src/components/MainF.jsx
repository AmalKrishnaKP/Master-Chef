import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IncredianceList from "./IncredianceList";
import { ToggleGetRecipe } from "./ai";

export default function MainF(){
    const [items,setItems]=React.useState([])
    const [recipy,setrecipy]=React.useState("")
    const recitySection=React.useRef(null)
    
    console.log(recipy);
    console.log(recitySection);
    
    async function generate(){
        const recipy=await ToggleGetRecipe(items)
        setrecipy(recipy)
        // await getRecipy(!recipyShown)
        
    }
    // console.log(items[0]);   
    
    
    // function submitForm(event){
    //     event.preventDefault()
    //     // const formData=new FormData(event.currentTarget)
    //     // const newitem=formData.get("newincreadinet")
    //     const newitem=event.currentTarget.children[0].value
    //     setItems(prev=>[
    //         ...prev,
    //         newitem
    //     ])
    //     event.currentTarget.children[0].value=""
        
        
        
    // }
    function submiting(formData){
        setItems(
            prev=>{
                return(
                    [
                        ... prev,
                        formData.get("newincreadinet")
                    ]
                )
            }
        )
    }

    
    
    return (
        <main>
            <form action={submiting} className="increadientForm">
                <input type="text" 
                aria-label="add increadient" 
                placeholder="enter the ites"
                name="newincreadinet"
                />
                <button type="submit">Add increadinace</button>
            </form>
            <IncredianceList 
                ref={recitySection}
                generate={generate}
                items={items}
            />
            {
                recipy &&
                <ClaudeRecipe 
                    result={recipy}
                />
            }
            
        </main>
    )
}