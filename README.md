# flocking_TCSS_491

Flocking Simulation: source code adapted from JavaScript Creativity

To run simulation:

  http://htmlpreview.github.io/?https://github.com/digitalNightingale/flocking_TCSS_491/blob/master/index.html
  
Assignment 2 - Interaction

To carry out this assignment follow these steps:

1. Select a Simulation of Interacting Components - Implement one of the suggested ideas or come up with your 
   own interactive system using the principles of agent-oriented design, complex systems and emergence. The key 
   element is that the animations should e merge from the interactions and not be scripted.
   
2. Create a Webpage - Create an HTML file and a JS file to create a canvas element and manage the elements in your animation.

3. Animate the Interactions - Implement the interactive components of the simulation and adjust the parameters so 
   interesting behaviors emerge. You may use any available course code but you should develop your own interactive 
   scheme and cite any code you use outside of the course code.
   
   
Assignment 3 - Database

To carry out this assignment follow these steps:

1. Complete Assignment 2 - For this assignment you must complete assignment 2 first and so must have a working 
   interactive animation.

2. Define the State  - For your interactive animation determine what information (e.g number, position, and velocity, 
   of agents) is needed to fully recreate the state of the animation.

3. Connect to the Database - To connect to the database you will need to:
      - Connect using socket.io to my server
      - Use the emit method to send  save  and  load  messages to the server.
      - In  save  and  load  messages the data object must have the two fields:
          i. studentname = “Your Name”
          ii. statename = “some identifier”
      - In save messages include other fields with the state data.
      - Respond to load messages from the server by loading the data that was previously saved.
