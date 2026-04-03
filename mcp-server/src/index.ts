import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
import {z} from 'zod'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const server = new McpServer({
    name:'cfd-query',
    version:'1.0.0'
})

server.tool('cfd-query','ask cfd-queryAi why your trade failed',
   {chartImage: z.string()
            .min(1, 'Image is required')
            .max(10_000_000, 'Image too large (max 10MB)')
            .describe('post chart image only (base64 string)')
},
    async({chartImage})=>{
     try{ 
        const askGpt40 = await axios.post('https://api.openai.com/v1/chat/completions',
        {
        model: 'gpt-4o',
        messages: [{
            role: 'user',
            content: [
                { type: 'text',
                  text: 'You are a professional CFD trading analyst. Analyze this chart image and provide: 1) Why the trade failed (technical analysis) 2) Specific mistakes made 3) Actionable recommendations to avoid similar losses in the future 4) Key lessons learned. Be detailed and educational.'  },
                { 
                    type: 'image_url', 
                    image_url: { url: `data:image/png;base64,${chartImage}`}
                }
            ]
        }]
    },
    {  
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    }
      )
        return {
            content:[{type:'text',text:askGpt40.data.choices[0].message.content}]
        }}
      catch(error) {
        return { content:[{type:'text' as const, text: `Error: ${error instanceof Error ? error.message : error}`}]}
      }
    }
)

async function main() {
    try{
        const transport = new StdioServerTransport
        await server.connect(transport)
    }
    catch(error){
        console.error(error)
    }
    
}

main()