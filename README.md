# Family Star
## About
Family Star is a mix between a task board and a game that families can use to make ordinary household tasks to something fun. Parents can add tasks and family members to the family's shared task board. Depending on how challenging or how long time the task takes the parent can adapt how many star points(scores) completion of the task gives. The family member that currently has the highest amount of collected star points is the family star(leader). 

Family members can pick a task to complete by assigning themselves at the task. When the task is completed, the family member marks the task as done.  The tasks progress is followed by two scoreboards, one for the family member and one for the whole family.
In the family member scoreboard, the family member can follow their own progress as it will be updated with information about how many: star points, ongoing tasks and closed tasks the family member has. Instead of only containing information about one family member the family’s scoreboard contains information about the progress of the whole family. It contains information about: who is the family star, how many tasks there is to-do, completed tasks and ongoing tasks.

Currently the site contains these categories: Cleaning, Cooking, Homework and Garden Work.


## Target Audience
This website is meant to attract families that wants to find a way to motivate their children to help out at home or wants to make ordinary household tasks to something fun. 

Parents that use this site would like to organize household tasks that needs to be done. They want to be able to create tasks that they can share with the rest of the family.  

Children that use this site would like to choose a task to do and then mark it as done when completed. Both parents and children want to follow how the family progress with their tasks.  

The main reason for users to revisit the website is because the task managing is intuitive and it’s easy to get an overview of the scores. But also, that the page has a nice and playful design and will hopefully make their lives more organized. 

## Owner Goals
- This app should be like a mix of a task board and a game, a gamified task board.  
- To create an app that is easy to navigate  
- To create an app that doesn't contain any unnecessary buttons 
- To create an account and fill your task board with tasks should be quickly done without any unnecessary steps  
- The design should be playful with bright colors and happy icons.  

## Table of Contents
## UX
### User Stories
[#11](https://github.com/MartinaB91/project5-task-app-front/issues/11) Epic: Registration, authentication and navigation
- [#7](https://github.com/MartinaB91/project5-task-app-front/issues/7) As a User I want to create a new account so that I can start/access a task-board for my family.
- [#8](https://github.com/MartinaB91/project5-task-app-front/issues/8) As a User I want to sign in with my username so that I can manage my task-board.

[#37](https://github.com/MartinaB91/project5-task-app-front/issues/37) Epic: Ability to CRUD family members

- [#38](https://github.com/MartinaB91/project5-task-app-front/issues/38) As a Parent I want to create a new family member so that I can add all my family members to the task-board.
- [#40](https://github.com/MartinaB91/project5-task-app-front/issues/40) As a Parent I want to delete a family member so that I can remove a member that don’t want to participate.

[#33](https://github.com/MartinaB91/project5-task-app-front/issues/33) Epic: Ability to CRUD tasks 
- [#34](https://github.com/MartinaB91/project5-task-app-front/issues/34) As a Parent I want to create a task so that I can fill our task-board with task.
- [#35](https://github.com/MartinaB91/project5-task-app-front/issues/35) As a Parent I want to update our tasks so that I can make corrections if needed.
- [#36](https://github.com/MartinaB91/project5-task-app-front/issues/36) As a Parent I want to delete tasks so that I can ensure that our task board only contains the content we parents selected.

[#28](https://github.com/MartinaB91/project5-task-app-front/issues/28) Epic: Task details
- [#29](https://github.com/MartinaB91/project5-task-app-front/issues/29) As a Family member I want to see which due date the task has so that I can know when it needs to be done.
- [#30](https://github.com/MartinaB91/project5-task-app-front/issues/30) As a Family member I want to see how many points the task will give so that I can choose a task based on the points it will give.
- [#31](https://github.com/MartinaB91/project5-task-app-front/issues/31) As a Family member I want to see which tasks that has been assigned and by who so that I can follow what other family members do.
- [#32](https://github.com/MartinaB91/project5-task-app-front/issues/32) As a User I want to see which category a task belongs to so that I can sort out tasks that’s not in the category I am searching for.

[#24](https://github.com/MartinaB91/project5-task-app-front/issues/24) Epic: Create family scoreboard
- [#25](https://github.com/MartinaB91/project5-task-app-front/issues/25) As a Family member I want to see how many open tasks there are so that I can know how much there is to do.
- [#26](https://github.com/MartinaB91/project5-task-app-front/issues/26) As a Family member I want to see how many tasks our family has completed so that I can follow how much work We have done together.
- [#27](https://github.com/MartinaB91/project5-task-app-front/issues/27) As a Family member I want to see who in the family that has the highest score so that I can know how many points I need to collect to be the leader.
- [#62](https://github.com/MartinaB91/project5-task-app-front/issues/62) As a Family member I want to see how many ongoing tasks Our family has so that I can know we are doing.

[#16](https://github.com/MartinaB91/project5-task-app-front/issues/16) Epic: Create current family member scoreboard
- [#17](https://github.com/MartinaB91/project5-task-app-front/issues/17) As a Family member I want to see my profile icon when I have selected my profile so that I can confirm that I am using the correct profile (family member).
- [#21](https://github.com/MartinaB91/project5-task-app-front/issues/21) As a Family member I want to see how many tasks I have completed so that I can follow how much work I have done.
- [#22](https://github.com/MartinaB91/project5-task-app-front/issues/22) As a Family member I want to see how many points I have earned so that I can compare my points with other family members.
- [#23](https://github.com/MartinaB91/project5-task-app-front/issues/23) As a Family member I want to see how many ongoing tasks I have so that I can decide if I can take on some more tasks or not.

[#15](https://github.com/MartinaB91/project5-task-app-front/issues/15) Epic: Search, filter, and sort tasks 
- [#12](https://github.com/MartinaB91/project5-task-app-front/issues/12) As a Family member I want to search for specific tasks so that I can find the task I want to find easier.
- [#13](https://github.com/MartinaB91/project5-task-app-front/issues/13) As a Family member I want to filter tasks so that I can view tasks that has a specific status.
- [#14](https://github.com/MartinaB91/project5-task-app-front/issues/14) As a Family member I want to view tasks sorted on due date so that I can see the tasks with the closest due-date first and prioritize my task selection.


## Technologies Used
### Languages
- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
- [JavaScript](https://www.javascript.com/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/css)
- [JSX](https://reactjs.org/docs/introducing-jsx.html)
### Frameworks and Libraries
- [React Bootstrap (2.5.0)](https://react-bootstrap.github.io/)
- [React Router (6.3.0)](https://reactrouter.com/en/main)
- [Font Awesome](https://fontawesome.com/) - Used for adding icons to website
- [Google Fonts](https://fonts.google.com/) - Used for fonts
### Databases
### Storage
### Other tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Used for debugging
- [Compress JPEG](https://compressjpeg.com/) - Used for compress images
- [Convertio](https://convertio.co/download/8f4ef43897af54f80228a73c98cc326cc42215/compress) - Used convert images from jpg to webp
- [GitHub Issues](https://github.com/features/issues) - Used for project planning 
- [Heroku](https://id.heroku.com/login) - Used to deploy app
- [HTML Color Codes](https://html-color-codes.info/colors-from-image/) - Used for finding colors from images
- [Invisionapp](https://www.invisionapp.com/home) - Used for wireframes

## Access Overview
- There are three different roles with different access: parents, children and admin. The administrator has access to admin page but can also be a parent and because of this access all sites and functions.  The parent role is available for the admin just for testing and evaluation purposes. 

|Page/functionality     | Parent | Child|  
|------------------|---------|--------| 
|Home              | Yes     | Yes    | 
|Task board	      | Yes	 | Yes    | 
|Create Task       | Yes     | No    | 
|Edit Task         | Yes      | No   | 
|Delete Task       | Yes     | No    | 
|Create Family Member       | Yes      | Yes    | 
|Assign Task       | Yes      | Yes    | 
|Done Task          | Yes      | Yes    | 
|Search Task    | Yes     | Yes    | 

|Filter Task	|Yes|Yes| 
## Components
### Navbar 
- As a non-authenticated user, the navbar contains “Family Star” with link to home page and “Sign In”.  
- As an authenticated user, the navbar contains “Family Star” as above. It also contains “Task Board” and the current profile’s “Username” which is a dropdown menu. 
- When the dropdown is expanded it contains the component display family members which will be explained in detail later together with a link to “Add Family Member”, “Add task” and a “Sign Out” button. 

### Display Family Members 
- In this component all the profile’s family members are displayed as an image and family member name.  
- If the profile doesn’t have any family members yet, the text “You haven’t added any family members yet. Create one below” will be displayed.  

### Footer 
- As non-authenticated user, the footer contains links to “Home” page. 
- As authenticated user, the footer contains links to “Home” page and “Task board” 

### Score Board Information Trigger  
- When hovering the i-icon in the profile scoreboard the user will find information about what the user can: do in the navbar, find on the scoreboard and how you assign and complete a task on the task board.  This can be useful information the first time you use the app and disturbing the regular user

### Task Ellipsis Buttons 
- The ellipsis button is displayed on all tasks and when the user clicks the button it will expand and the user will be displayed with two links displayed as icons. One for edit tasks and one for delete tasks.  

## React Library 
## Features
### Home page 
- The home page contains a hero image with some text. The text consists of an explanation of what you can use this website for. This is meant to attract users to want to try this app. The text is followed by a sign-up link to make it easy for visitors to sign up. 

### Task Board 

- This page is the main page where you can reach all other pages and can be divided into four sections. The first section is the profile scoreboard, followed by the family member score board. Then the user can find a section for searching and filtering and below the task section where all tasks are displayed 
- If there's is no tasks to display the following text will be shown “You haven’t created any tasks yet. Go to the navbar to create one” 

### Profile Score Board 
- The profile scoreboard contains information that applies to all family members.  
- Family Star shows a profile image, nickname and points of the member with the highest number of stars. 
- Todo, is all tasks that needs to be done but isn’t assigned yet 
- Completed tasks, is all tasks that the family has marked as done 
- Ongoing tasks, is all tasks that at the moment is assigned to a family member 

### Family Member Score Board 
- The family member scoreboard contains information that applies to a specific family member. By being able to see their own scores together with the scores on the profile scoreboard, the user can compare their own performance and choose tasks according on how many points needed to become the Family Star.  
- On the top of the scoreboard the family member image and name are displayed. This will let the user know who the current family member is.  
- Star points, how many points the member has collected.  
- Ongoing tasks, shows how many tasks the member has ongoing 
- Closed tasks, shows how many tasks the member has marked as done.  

### Task 
- Every task contains, ellipsis button, title, star points, end date, task description, assign-button, category and done-button.  
- All tasks are by default ordered by end date, tasks that has the closest end date is displayed first. This to make it easy for the users to see which tasks that needs to be done next.  

### Assign-button 
- If a task is unassigned the assign-button will be displayed as <img src="documentation/readme-svg/user-plus-solid.svg" width="10" height="10">, when the task is assigned the family members profile image and name is displayed.  
- A user can’t mark a task as done before the task is assigned and only the user that has assigned a task can unassign the task.  

### Done-button 
- A task that isn’t marked as done will have a grey button, when the task is done and the user clicks the button it will change color to green

### Create Task 
- This page contains a form for creating a task. The Parent can add a: title, category, star points, end date, description and optionally assign a family member. 
- When the task is created the user will be redirected to the task board.  
- If a family member that has the role “child” is trying to create a task the user will see a warning message: “Ask your parents to create a task”. 

### Edit Task 
- At this page the Parent can update almost all parts of the task, the one thing they can’t update is the tasks status (to-do or done).  
- When the task is updated, the user will be redirected to the task board.  
- If a family member that has the role “child” is trying to edit a task the user will see a warning message: “Ask your parents to edit the task”. 

### Delete Task 
- When the user clicks on the trash can icon displayed in the ellipsis button, they will be redirected to a delete task page and asked to confirm deletion. When the task is deleted, the user will be redirected to the task board.  

### Add Family member  
- This page contains a form for creating a family member. The family members can add a: profile image, nickname and a role.  
- When the family member is created the user will be redirected to the task board. 



## Design
### Color Scheme
### Typography
### Icons 
### Search bar and Filter
### Wireframes 
- [**Phone**](documentation/wireframes/WIREFRAMES.md)
### Database Scheme
## Testing
## Future Improvements
### Known bugs
## Deployment
## Credits
### Code
- [Stackoverflow - Highest value](https://stackoverflow.com/questions/36941115/return-object-with-highest-value) - Used for finding and returning family member with highest star points. 
### Content and Media
- [Pexels](https://www.pexels.com/sv-se/) - All pictures on app are from Pexels
### Test
