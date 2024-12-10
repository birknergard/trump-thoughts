# Exam for web-development course


### Frontend

## Tasks (Ordered by most important)
- Report

### Backend 
- delete image file on thought deletion
- simplify other api databases (less fields)
- API documentation
- Generate 8 database fields per entity from chatgpt

### Frontend

- Tone filter is not working
- Error text for when field isnt filled (create)

- Implement icons for navbar
- Responsive design (using App.css)
- :hover and other interactive styling (using css modules)
- Create more entries
- general styling (using tailwind) 

IF I HAVE TIME(Unlikely):
- query filter for statement, where text is highlighted on result

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

### Frontend
- Rudementary planning
- Basic routing implemented
- Page templates set up

- View trump thoughts (statements)
- you can create new thoughts, and upload image to accompany it
- you can edit thoughts
- Navigating between the two pages

- Create 8-12 entries for testing purposes
- preview uploaded image in thoughtcreator
- reset entries on create page
- filter trump thoughts by topic
- filter trump thought by tone
- search trump thought by title
- visual indicators for when fields arent filled in thoughtcreator
- Pop up dialog box when deleting items

## Useful commands

Launch for backend
    dotnet run --launch-profile https

Launch for frontend
    npm start

Create database migration
    dotnet ef migrations add "migration-name" 

Update database
    dotnet ef database update