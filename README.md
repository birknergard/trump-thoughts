# Exam for web-development course

## Tasks (Ordered by most important)
- Report
- Sort frontend folder structure (components)
- Video demonstration

### Backend 
- API documentation

#### maybe?
- Multiple GET requests (tone, topic or tone&&topic) with a single method

### Frontend
- Modify/remove thought while having a filter on, so that if you edit it it stays on the previous filter (perhaps move filter for topic and tone into context and based on that run different fetches?)
- general styling (using tailwind) 

#### maybe?
- :hover and other interactive styling (using css modules)
- if search does not find any matches for title, check statement instead
- query filter for statement, where text is highlighted on result
- restrictions on input (word limit etc.)

## Completed tasks
### Pre exam
- Set up Route controller
- Set up frontend boilerplate
- Prepare git repo
- Set up backend boilerplate
- connect both pcs (mac and pc) 
- Research C# .NET API and/or Database

### Backend
- data structure for TrumpThought
- data structure for TrumpMerch
- data structure for Trumpstaff

- Set up Models

- figure out whether i need multiple controllers or just one ( Multiple**)

- Set up Contexts
- Set up Controller(s)
- figure out uploadimagecontroller
- Set up databases (Initialize)

- CRUD for Thought
- CRUD for Merch
- CRUD for Staff

- Delete method for ImageController
- simplify other api databases (less fields)
- Generate 8 database fields per entity from chatgpt

### Frontend
- Rudementary planning
- Basic routing implemented
- Page templates set up

- View trump thoughts (statements)
- you can create new thoughts, and upload image to accompany it
- you can edit thoughts
- Navigating between the two pages
- Extract neccesary thoughtcreator logic onto create-page
- Refactored entire thoughtcreator page

- Create 8-12 entries for testing purposes
- preview uploaded image in thoughtcreator
- reset entries on create page
- filter trump thoughts by topic
- filter trump thought by tone
- search trump thought by title
- visual indicators for when fields arent filled in thoughtcreator

- Pop up dialog box when deleting items
- Tone filter is not working
- grey out logging 
- make topic filter update api call with the api/topic call instead of default
- Error text for when field isnt filled (create)
- Preview doesnt reset after submit
- Move filter feature to its own component
- consistent preview placholders ("No tone" and "a topic" look inconsistent)
- Responsive design (using App.css)

- link back to main on NotFound page
- Create more entries
- Fix bug where image filename and preview does not reset when navigating from create 
- remembers users unfinished thought creation
    - store incomplete created thought in localstorage when navigating out
    - Make uploaded image persistent even when not submitted

## Useful commands

Launch for backend
    dotnet run --launch-profile https

Launch for frontend
    npm start

Create database migration
    dotnet ef migrations add "migration-name" 

Update database
    dotnet ef database update