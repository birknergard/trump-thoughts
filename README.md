# Exam for web-development course


### Frontend

## Tasks
### Backend infrastructure
- Generate 8 database fields per entity from chatgpt


### Frontend app
!!! Figure out image upload !!!
- Api GET connection on:
    - main
    - shop
    - staff

- POST functionality on:
    - main
    - shop
    - staff(?)

- PUT functionality on:
    - main
    - shop
    - staff

- Rudementary components:
    - Input(text)
    - Input(int)
    - Responsive grid system component

    - Staff item
    - Thought item
    - Shop item


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

## frontend implementation/functionality
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