// const API=import.meta.env.VITE_GEMINY_API


// async function GetRecipy(names){
  
//     const prompt=`
//         You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page,the list is:${names.join(",")}
//     `
//     const responce= await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API}`,{
//         method:"POST",
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify(
//             {
//                 "contents": [
//                   {
//                     "parts": [
//                       {
//                         "text": prompt
//                       }
//                     ]
//                   }
//                 ]
//               }
//         )
//     })

//     const data=await responce.json();
//     console.log(data);
    
//     const content= await data.candidates[0].content.parts[0].text
//     // console.log(content);
    
//     return content;

// }

// export async function ToggleGetRecipe(names){
//     const result=await GetRecipy(names)
//     // console.log(result);
    
//     return result
// }

////////////////////////////
import Anthropic, { AnthropicError } from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`



const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_GEMINY_API,
    dangerouslyAllowBrowser: true,
})

export async function GetRecipy(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
    });
    return msg.content[0].text
}

// Make sure you set an environment variable in Scrimba 
// for HF_ACCESS_TOKEN
const hf = new HfInference(import.meta.env.VITE_GEMINY_API)

export async function ToggleGetRecipe(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}