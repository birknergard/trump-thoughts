# Exam for web-development course


### Frontend

## Tasks
### Backend infrastructure
- Generate 8 database fields per entity from chatgpt



### Frontend app
Needs to include:
Somewhere to view trump thoughts
    - Filter by topic (topic has to be enum) 
    - Create new
    - Edit another topic
    - Delete
Somewhere to buy merch
    - Show merch from API
    - Store shopping cart i localstorage
    - Add item to shopping cart
    - view shopping cart
    - Create new (?)
Staff page
    - Show all employees
    - Add new employee



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



### Models structure
TrumpThought:
- int Id
- string Thought
- string? Category

TrumpMerch:
- int Id,
- string Name,
- double Price,
- string Category

TrumpStaff:
- int Id,
- string Name,
- string? ImageUrl





**

## Useful commands

Launch for backend
    dotnet run --launch-profile https

Launch for frontend
    npm start

Create database migration
    dotnet ef migrations add "migration-name" 

Update database
    dotnet ef database update