# Share Times
The news sharing app
## Prerequisites for setup(env variables)
- Supabase project base url
- News API base url
- Supabase API key
- News API key
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
## Extra features implemented
- Sign up confirmation mail
- Share to socials with copiable message containing the source link
- Share to Whatsapp feature