
export async function GET(){
    return Response.json({message: "Hello from GET food"})
}

export async function POST(){
     return Response.json({message: "Hello from POST food"})
}