import express from 'express'

const app = express()
const bootstrap =async function() {
    try{
        app.listen(3617,()=>{
            console.log('app running at port 3617')
        })
    }
    catch(err){
        console.log('app not running', err)
    }
}

bootstrap()
