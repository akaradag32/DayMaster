# DayMaster

<img src="./src/assets/logo.png" alt="logo" width="400"/> </br>
[Click here to see the deployed app](https://cerulean-hummingbird-90f820.netlify.app/)

## Project Description

DayMaster is a web application designed to help you streamline your task management. It offers features to create, manage, and track tasks with different priorities, due dates, and descriptions. Whether you're looking to organize your daily to-dos or plan your long-term goals, this task manager is here to make your life more organized and productive.

## MVP (Minimum Viable Product)

The MVP of this project includes the following features:
1. **Homepage:** An introductory page that provides users with an overview of the task manager.

2. **Task Board:** A central feature that allows users to view and manage their tasks. Tasks are displayed in an organized manner by date.

3. **Create Task:** Users can create new tasks by specifying a title, description, due date, time, and priority.

4. **Update Task:** The ability to edit and update existing tasks, providing flexibility for users to modify task details.

5. **Random Task Generator:** A convenient feature that generates random task using Bored API, helping users quickly populate their task list.

## Backlog

The backlog includes a list of planned features and improvements for future releases:

- [ ] User authentication and task management for multiple users.
- [ ] Task categories and labels for better organization.
- [ ] Task search and filtering functionality.
- [ ] Task reminder and notification system.
- [ ] Mobile responsiveness and UX enhancements.

## Project File Structure

The project is organized with the following file structure:

- `src/` This is the main source directory for the project.
    - `main.jsx`: The entry point of the application.
    - `app.jsx`: The main application component that sets up routing and page structure.

    - `pages/`: This directory contains React components for different pages of the application.
        - `HomePage.jsx`: The homepage component that introduces the task manager.
        - `DisplayTasksPage.jsx`: Component for displaying and managing tasks.
        - `CreateTaskPage.jsx`: Component for creating new tasks.
        - `UpdateTaskPage.jsx`: Component for updating existing tasks.

    - `components/`: This directory holds reusable components used throughout the application.
        - `Navbar.jsx`: The navigation bar component with a link to the homepage.
        - `TaskForm.jsx`: A form component for creating and updating tasks.
        - `Task.jsx`: Component to display individual tasks with options to edit, delete and mark as complete.
        - `Button.jsx`: A reusable button component for various actions.
        - `AddTaskButton.jsx`: A button for adding tasks on specific dates.

    - `assets/`: This directory contains image assets used in the application, such as icons and logos.

## Links

- [Presentation Link](https://www.canva.com/design/DAFw9ZLzh3Y/vwa0sVuC3VaMr_951JzHOg/watch?utm_content=DAFw9ZLzh3Y&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)
- [Github repository Link](https://github.com/akaradag32/DayMaster)
- [Deployment Link](https://cerulean-hummingbird-90f820.netlify.app/)


