# Exam for web-development course

## Tasks (Ordered by most important)

#### maybe?
- if search does not find any matches for title, check statement instead
- query filter for statement, where text is highlighted on result
- restrictions on input (word limit etc.)

## Completed tasks
- Video demonstration
- Report (mostly complete)

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
- Temp stored images are in a different folder from regular ones (new endpoint?)
- temp images can now be moved directly into images folder via the api.
- API documentation

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
- Unfinished thoughts are now saved with a button, and loaded when returning
- When having selected an image for a thought but not saved it, and then reentering the page, the image is not deleted from the API.
- Sort frontend folder structure (components)

- (note: only halfway working, gave up on trying to preserve state after deletion for my own sanity) Modify/remove thought while having a filter on, so that if you edit it it stays on the previous filter (perhaps move filter for topic and tone into context and based on that run different fetches?)

- Make a dedicated button or indicator for editing thoughts in thoughtlist 
- Delete button should be an x-icon in the corner, harder to misclick.
- Styling of Item in editmode.
- general styling (using tailwind) 
- Take a look at list responsive design when thoughts arent loaded and when thoughts are loading.
- :hover and other interactive styling (using css modules)

## Useful commands

Launch for backend
    dotnet run --launch-profile https

Launch for frontend
    npm start

Create database migration
    dotnet ef migrations add "migration-name" 

Update database
    dotnet ef database update