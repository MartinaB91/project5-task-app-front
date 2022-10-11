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
## React Library 
## Features
<img src="documentation/readme-svg/user-plus-solid.svg" width="10" height="10">

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
