# car-advisor
A full-stack solution advising customers about the cars using Amazon Bedrock's Claude model, given the JSON of the available cars 
# Screenshots
<img width="736" height="405" alt="image" src="https://github.com/user-attachments/assets/60b6d17f-f8f4-4f36-ba17-9376f002270c" />
<img width="1466" height="820" alt="image" src="https://github.com/user-attachments/assets/0fddd68c-921d-44e6-8bd8-404e822b07ae" />

## Approach 
 Mock database and use the JSON (skipping the real DB work)
 There will be a simple express server that will contain api for calling Claude's model
 Initially, there will be a client that will contain the set of questions asking the users about their budget, year of make, and preferred brand/model
 Use the questions to give it to the Anthropics' Claude Sonnect, along with the JSON generated, to get our top 3 recommendations from the dataset provided
 Next would be sending the whole JSON to the customer, and the customer can choose along and may be dig in further with the chat involved
 ### What did you build and why? What did you deliberately cut?
 - What did I build?
   - Bedrock's streaming API for streaming the responses to the customer's queries
   - API Layer using Express
   - React application showcasing the responses in a streaming way
   - Rate Limiting added
   What was cut deliberately?
   - Building the RAG pipeline was one thing to be deducted due to mock data; in prod scenarios, this should be taken into consideration
   - Building real databases and Vector DBs and embedding since Claude's Sonnet model is already doing the work

 ### What’s your tech stack and why did you pick it?
 - Amazon Bedrock
 - Claude's Sonnet model v4
 - Express (API Service layer)
 - React (Client)

 ### What did you delegate to AI tools vs. do manually? Where did the tools help most?
    - Creation of repetitive data and codes, which can be built faster by Claude rather than a human writing the code
    - CSS and UI changes
    - Manual work was on the orchestration and making sure that things worked out
    - Taking care of the coding standards
    - Tools that helped here were Claude Code, Copilot for scaffolding and error handling scenarios, and delivering faster code. 


 ### If you had another 4 hours, what would you add?
 - Docker Addition could be considered for the deployment part, used to render because of the time constraints and it being a free one
 - Auth Layer and Authorization Layer
 - RAG pipeline (It would refer to the Internal data and will not expose the data to the training model (Anthropic))
 - Further improvements in the codebase. 
