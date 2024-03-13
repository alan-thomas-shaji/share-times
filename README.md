# Share Times
The news sharing app
## Prerequisites for setup
- Supabase API keys
- News API keys
## Setup
- Run ```git clone``` to clone the repo
- Install dependacy libraries using ```npm i ```
- Run the development server by running ```npm run dev```

## Routes
- User: 
    - Login ```/login```
    - Signup ```/signup```
- App
    - Home ```/``` has latest news updates
    - Articles ```/articles``` has the results of the search done in home page, integrated with infinity scroll
    - Bookmarks ```/bookmarks``` contains the bookmarked articles
    - Profile ```/profile```: user profile