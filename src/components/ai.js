const API=import.meta.env.VITE_GEMINY_API
console.log(API);

async function GetRecipy(names){
    const prompt=`
        You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page,the list is:${names.join(",")}
    `
    const responce= await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API}`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(
            {
                "contents": [
                  {
                    "parts": [
                      {
                        "text": prompt
                      }
                    ]
                  }
                ]
              }
        )
    })

    const data=await responce.json();
    const content= await data.candidates[0].content.parts[0].text
    // console.log(content);
    
    return content;

}

export async function ToggleGetRecipe(names){
    const result=await GetRecipy(names)
    // console.log(result);
    
    return result
}