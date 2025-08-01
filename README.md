# User Management Web Application `

A modern web application built with Next.js that provides comprehensive user management fucnctionality with authentication, CRUD operations, and a minimalist UI.

# Features

## Authentication
- Login system using JSON Placeholder API
- Cookie-based authentication
- Protected routes with middleware
- Auutomatic redirects based on authentication status

## User Management
- View Users: Display users in a responsive table
- Add Users: Form to register new users with validation
- Update Users: Modal form to edit existing user information
- Delete Users: Remove users from the system

## Technical Features
- React Query: For efficient data fetching and caching
- React-Hook-Form: For form state management
- Zod Validation: For robust form validation
- Toast Notifications: User feedback for all operations
- Responsive Design: works on desktop and mobile devices
- Typescript: Fulll type safety throughout the application

## Tech Stack
- Framework: Next.js 15 with App Router
- Language: Typescript
- Styling: Tailwind CSS
- State Management: React Query + React Hooks
- Forms: React-Hook-Form + Zod
- Notifications: Sonner Toast
- Authentication: Cookies (js-cokokie)
- API: JSON Placeholder API

### Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-app
``` 

2. Install dependencies:
``` bash
npm install
``` 

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result


### Authentication
1. NAvigate to the application
2. You'll be redirected to the login page
3. Use these test credentials:
    - Email: `Sincere@april.biz`
    - Password: `Bret`
4. Click "Sign In" to access the dashboard

### User Management
Once logged in, you can:

- View Users: See all users in the table
- Add Users: Fill out the form on the left and click "Add   User"
- Update User: Click the "Update" button on any user row
- Delete User: Click the "Delete" button on any user row

### Toast Notifications
The application shows toast notifications for:
- ✅ Successful Login
- ❌ Failed Login
- ✅ Successful user registration
- ✅ Successful user update
- ✅ Successful user deletion


### Project Structure
```
app/
├── components/          # Reusable UI components
│   ├── AddUserForm.tsx  # Form for adding new users
│   ├── Header.tsx       # Navigation header with logout
│   ├── LoginForm.tsx    # Login form component
│   ├── UpdateUserModal.tsx # Modal for updating users
│   └── UserTable.tsx    # Table displaying users
├── dashboard/           # Dashboard page
│   └── page.tsx         # Main dashboard with user management
├── login/               # Login page
│   └── page.tsx         # Authentication page
├── types/               # TypeScript type definitions
│   └── user.ts          # User interface
├── globals.css          # Global styles
├── layout.tsx           # Root layout with providers
└── page.tsx             # Home page with routing logic
```

## API Integration

- Authentication: Uses email and username parameters
- User Data: Fetches  first 5 users as initial data
- Error Handling: Graceful fallbacks for API failures

## Development

### Available Scripts

- `npm run dev` - Start development server
- ` npm run build` - Build production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Dependencies

- `@tanstack/react-query` - Data fetching and caching
- `react-hook-from` - Forn state management
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `sonner` - Toast notifications
- `js-cookie` - Cookie management


## License

This project is open source and available under the [MIT License](LICENSE). 