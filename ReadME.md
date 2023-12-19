# CCAPDEV Machine Project
## Contributors
- Diaz, Sebastian
- Go, Daphne Janelyn
- Lasala, Kyle Carlo
- Manlises, Maria Monica

## Prototype
- [AnimoEats on Figma](https://www.figma.com/file/uLfvLlvAQFUqybDy3Ggy6O/APPDEV---AnimoEats?type=design&node-id=0%3A1&mode=design&t=4Qtl6cMkuSQnp1Wd-1)

## Web App Setup Instructions
1. Go to https://animoeats.onrender.com/

## Project Specifications: Food Store Review Web Application
- A food store review web application for the food stores near in DLSU. Specifically designed for Lasallians in DLSU-Manila. This project serves as a course requirement in Web Application Development (CCAPDEV).
### Required Features
- View establishments
    - Landing page - <strong>unregistered visitors may see a list of establishments</strong> that are featured in the web application.
    - <strong>Overall rating and brief description</strong> of the establishment must be easily viewed/accessible from the list.
- View an establishment's reviews
    - Establishment specific - <strong>unregistered visitor may see the top reviews.</strong> 
    - The user can also <strong>see the next set of top reviews.</strong> 
        - Either the next set will <strong>auto-reload or load in another page.</strong>
    - Reviews can be long, so some of the <strong>text in the preview could be truncated.</strong>
    - <strong>Clicking the review</strong> will let the user view the review in full detail.
    - Reviews should also <strong>include how many registered users found the review helpful/unhelpful.</strong>
- Register
    - A visitor <strong>must register if they want to post a review.</strong>
    - Registration - <strong>username, password,</strong> avatar (not required), and a short description (not required).
- Login
    - Login page - <strong>after registration, user must login.</strong>
    - Once logged in, <strong>user can start posting reviews.</strong>
    - The user can <strong>set the login info to be remembered</strong> by the website.
    - Once remembered, every login and visit to the website will <strong>extend their "remember" period by 3 weeks.</strong>
- Logout
    - Logout function - <strong>return to landing page.</strong>
    - <strong>Cut short the "remember" period</strong> if it exists, and clears any session-related data.
- View a user profile
    - Profile page (from visitor's POV) - each <strong>user has their own page</strong>, which shows their profile publicly.
    - Contains <strong>username, profile picture, and short description.</strong> 
    - The visitor may see a portion of the <strong>user's latest reviews and comments.</strong>
    - The visitor may see the <strong>rest of the posts and comments of the user.</strong>
- Edit profile
    - Profile page (from user's POV) - logged-in user can <strong>add/modify a profile picture and provide a short description.</strong>
- Create a review
    - Review page - logged in user can <strong>create a review on a selected establishment.</strong>
    - Give a <strong>title and the body of the review.</strong>
    - <strong>Rating must be given</strong> by the reviewer.
    - Users must also be allowed to <strong>attach media</strong> to their review.
    - Additional points will be given for <strong>allowing markup (e.g., rich text editing)</strong> without the risk of cross site-scripting.
- Mark as Helpful/Unhelpful
    - A logged in user can <strong>mark a review as either helpful/unhelpful once.</strong>
- Edit/Delete a review
    - The owner of the review may <strong>edit their review at any point.</strong>
    - Edited review will have an <strong>indication that it has been edited.</strong>
    - The owner of the post may <strong>delte their review.</strong>
- Search Establishments / Reviews
    - Search function - A visitor can search for establishments by <strong>similarities in the name or the description.</strong>
    - Entering a search phrase/word, all establishment <strong>containing the keyword/phrase will appear.</strong>
    - Visitors may also <strong>filter based on its overall rating.</strong>
    - Visitors can <strong>search on an establishment based on the review's title or body</strong>.
- Establishment owner response
    - Account role function - establishment <strong>owner.</strong>
    - <strong>Does not need to be integrated with the register system.</strong> Can be created manually by the database admin.
    - Establishment owner accounts are <strong>tied to a single establishment and can respond to reviews</strong>
- General
    - Good UX.
    - Visitors can easily navigate without help; all information is easy to access. 
    - Good visual design.
    - Design suits the theme of the application and is cohesive and consistent across the whole application.
