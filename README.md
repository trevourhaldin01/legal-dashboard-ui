# Legal Dashboard UI

## <a name="table">Table of Contents</a>
1. [Introduction](#introduction)
2. [Tech Stack](#tech_stack)
3. [Approach](#approach)
4. [Installation](#installation)

## <a name="introduction"> Introduction</a>
This is a <a href="https://nextjs.org/">NextJS</a>  project designed to create a responsive and user-friendly dashboard for a legal practice management system. Built using Next.js, TypeScript, Redux Toolkit, and Tailwind CSS, this dashboard provides an intuitive interface for managing legal operations efficiently. The project simulates API interactions to ensure a dynamic and interactive experience, allowing users to navigate through different sections, manage case details, and configure system settings seamlessly.  The hosted application can be found at https://legal-dashboard-ui.vercel.app/

## <a name="tech_stack">Tech Stack</a>

- Nodejs
- NextJS
- TypeScript
- Redux Toolkit
- Tailwind

## Approach
### UI Development
The Application consists of a modern dashboard consisting of widgets summarizing the major modules of the application (cases, documents, time tracking). It also consists of a responsive rol based sidebar to enable navigation to sepcific pages where details of the modules are found and crud operations can be performed based on role.

### State Management
State management is done with redux Toolkit fro centralized state management. slices for cases, documents and time entries are defined with actions to enable simulaton of CRUD operations on the specified modules.
redux-persist is used to  save the state in the localStorage to prevent frequent fetching of same data which can affect performance. 
Role based UI control is implemented based on the redux state of auth.

### API simulation
Api service modules are created in lib/services to return fake mock data for cases, documents and time tracking. These services are called on page load and data stored in redux whic later saves to localStorage through redux-persist, this is done to prevent fetching on each page render.
The mock functions are awaited by a time interval of 1s to simulate normal fetching operations, this enables implementation of loading states in the ui.
The mock services have a failure rate of 10% to demonstrate error handlng and show an appealing ui to the user, and a reload function is provided to enable reloadinf of the data incase of an error.

### CRUD operations
CRUD operations are done in redux to simulate the normal working operations to  the server. Therefore on state refresh or clear, past data is lost due to the nature of redux and this is for d3emonstration purposes.
Role based operations are done based on module, for example,
In Cases, a standard user can add and update case but cannot delete case, while admin user has all rights.

### Authentication and Authorization
User authentication is simulated with roles
1. Admin user (email:admin@legaltech.com, password:admin123)
2. Standard User (email:user@legaltech.com, password: user123)
Based on the logged in user email, a role is assigned to the user and stored in redux to enable role based UI access.
Without an assignrd role, access to dashboard pages is restricted because isAuthenticates state is false.
A standard user is restricted from certain pages names dashboard/settings and dashboard/reports.

### Testing 
Tesitin is done using Jest and testing library fro react.
an auth test to test authentication is done.
An authorized test to test user acccess to adminOnly pages e.g settings Page .
A ui flow test to test the rendering of components on successful login and navigation

## <a name="installation">Installation</a>
Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

this project was tested on node v20.15.

**Cloning the Repository**

```bash
git clone https://github.com/trevourhaldin01/legal-dashboard-ui.git
cd legal-dashboard-ui
```

Install the project dependencies using npm:

```bash
npm install
```
**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser or any HTTP client to test the project with provided login details in the Approach section.

