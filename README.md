# car-advisor
Advises cars to consumers using Amazon Bedrock's Cluade model

## Approach 
 Mock database and use the JSON (skipping the real DB work)
 there will a simple express server which would contain api for calling the Claude's model
 Intitially there will be a client which would contain the set of questions asking the users about their budget, year of make and preferred brand / model
 Use the questions to give it to the ANthropic's Claude Sonnect along with the JSON generated in order to get our top 3 recommendattions from the dataset provided
 Next would be sending the whole JSON to the customer and the customer can choose along and may be dig in further with the chat involved
 ### What did you build and why? What did you deliberately cut?
 - What did I built?
   - Bedrock's streaming API for streaming the responses of the customer's queries
   - API Layer using Express
   - React application showcasing the responses in a streaming way
   - Rate Limiting added
   What was cut deliberately?
   - Building the RAG pipeline was one thing to be deducted due to mock data, in prod scenarios, this should be taken into consideration
   - Building real databases and Vector DBs and embedding since the Claude's Sonnet model is already doing the work

 ### What’s your tech stack and why did you pick it?
 - Amazon Bedrock
 - Claude's Sonnet model v4
 - Express (API Service layer)
 - React (Client)

 ### What did you delegate to AI tools vs. do manually? Where did the tools help most?
    - Creation of repetitive data and codes which can built faster by cluade rather than human writing the code
    - CSS and UI changes
    - Manual work was on the orchestration and making sure that the things work out
    - Taking care of the coding standards
    - Tools which helped here was Claude Code, Copilot for scaffolding and error handling sceenarios and delivering the faster codes, 


 ### If you had another 4 hours, what would you add?
 - Auth Layer and Authorization Layer
 - RAG pipeline (It would refer the Internal data and will not expose the data to the training model (Anthropic))
 