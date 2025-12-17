# CodeLens - System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    CODELENS ARCHITECTURE                                       │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  Gemini AI API   │
│   (Code Anal.)   │
└────────┬─────────┘
         │ API Call
         │
    ┌────▼─────────────────────────────────────────────────────────────────────────┐
    │                          DATA PROCESSING LAYER                               │
    │  ┌──────────────────────────────────────────────────────────────────────┐   │
    │  │ Analysis Processing                                                │   │
    │  │ • Code Parsing                                                     │   │
    │  │ • Complexity Calculation (Time & Space)                            │   │
    │  │ • Algorithm Explanation Generation                                 │   │
    │  │ • Results Formatting                                               │   │
    │  └──────────────────────────────────────────────────────────────────────┘   │
    │  ┌──────────────────────────────────────────────────────────────────────┐   │
    │  │ Blog Processing                                                    │   │
    │  │ • Rich Text Editor Processing (Tiptap JSON)                        │   │
    │  │ • Markdown Conversion                                              │   │
    │  │ • Slug Generation                                                  │   │
    │  │ • Tag Management                                                   │   │
    │  └──────────────────────────────────────────────────────────────────────┘   │
    │  ┌──────────────────────────────────────────────────────────────────────┐   │
    │  │ User Management                                                    │   │
    │  │ • Authentication (JWT)                                             │   │
    │  │ • Password Hashing (bcrypt)                                        │   │
    │  │ • Role-Based Access (User/Admin)                                   │   │
    │  │ • Session Management                                               │   │
    │  └──────────────────────────────────────────────────────────────────────┘   │
    └────┬──────────────────────────────────────────────────────────────────────────┘
         │ Processed Data
         │
┌────────▼─────────────────────────────────────────────────────────────────────────┐
│                            BACKEND LAYER                                         │
│                        Node.js + Express.js                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │  Auth Routes │  │Analysis      │  │  Blog Routes │  │   Middleware       │  │
│  │              │  │  Routes      │  │              │  │  • Auth (JWT)      │  │
│  │ • Register   │  │              │  │ • Create     │  │  • Error Handler   │  │
│  │ • Login      │  │ • Analyze    │  │ • Read       │  │  • CORS            │  │
│  │ • Get User   │  │ • History    │  │ • Update     │  │  • Body Parser     │  │
│  │              │  │              │  │ • Delete     │  │                    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └────────────────────┘  │
│                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────┐ │
│  │                        API AGGREGATION LAYER                              │ │
│  │  • Request Validation  • Response Formatting  • Error Handling            │ │
│  └────────────────────────────────────────────────────────────────────────────┘ │
└────┬─────────────────────────────────────────────────────────────────────────────┘
     │
     ├──────────────────────────┬──────────────────────────┐
     │                          │                          │
     ▼                          ▼                          ▼
┌────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐
│  MongoDB Atlas     │  │  Combined Metadata   │  │  User State      │
│                    │  │                      │  │                  │
│ Collections:       │  │ • Analysis Results   │  │ • Current User   │
│ • Users           │  │ • Blog Statistics    │  │ • Preferences    │
│ • Analysis        │  │ • User Activity      │  │ • Bookmarks      │
│ • Blogs           │  │ • Performance Metrics│  │ • Watch History  │
│                    │  │                      │  │ • Sync State     │
└────────────────────┘  └──────────────────────┘  └──────────────────┘
                              │                          │
                              │                          │
                         Used by Frontend          Cached Frontend
                                                  │
                                                  ▼
                                    ┌──────────────────────────┐
                                    │   FRONTEND LAYER         │
                                    │   React.js + Vite        │
                                    │                          │
                                    │ Pages:                   │
                                    │ • Home / Analyzer        │
                                    │ • Code Editor            │
                                    │ • Results Display        │
                                    │ • History View           │
                                    │ • Blog Browse            │
                                    │ • Blog Editor            │
                                    │ • User Profile           │
                                    │ • Tutorials              │
                                    │                          │
                                    │ Components:              │
                                    │ • Navbar                 │
                                    │ • CodeMirror (Editor)    │
                                    │ • Complexity Result      │
                                    │ • Blog Card              │
                                    │ • Auth Forms             │
                                    │ • Tiptap Editor          │
                                    │                          │
                                    │ Styling:                 │
                                    │ • Tailwind CSS v4        │
                                    │ • Responsive Design      │
                                    │ • Dark Mode              │
                                    └──────────────────────────┘
```

---

## Data Flow Example: Code Analysis

```
User Input (Code)
       │
       ▼
┌──────────────────────────┐
│   Frontend (React)       │
│ • Code Editor Input      │
│ • Language Selection     │
│ • Form Validation        │
└────────┬─────────────────┘
         │ HTTP POST /api/analysis
         │ (Code + Language + JWT Token)
         │
         ▼
┌──────────────────────────────┐
│   Backend Auth Middleware    │
│ • Verify JWT Token           │
│ • Extract User ID            │
└────────┬─────────────────────┘
         │ Authenticated Request
         │
         ▼
┌──────────────────────────────┐
│   Analysis Controller        │
│ • Validate Input             │
│ • Parse Code                 │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Gemini AI Service          │
│ • Send Code + Prompt         │
│ • Get Complexity Analysis    │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Database (MongoDB)         │
│ • Save Analysis Record       │
│ • Store User ID + Results    │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Backend Response           │
│ • Return Analysis JSON       │
│ • Include Complexity Data    │
│ • Include Explanation        │
└────────┬─────────────────────┘
         │ HTTP Response (JSON)
         │
         ▼
┌──────────────────────────────┐
│   Frontend (React)           │
│ • Display Results            │
│ • Show Complexity Charts     │
│ • Display AI Explanation     │
│ • Allow Save to History      │
└──────────────────────────────┘
```

---

## Data Flow Example: Blog Creation

```
Blog Content Input
       │
       ▼
┌────────────────────────────────┐
│   Frontend (React)             │
│ • Tiptap Rich Text Editor      │
│ • Title Input                  │
│ • Tags Input                   │
│ • Publish Toggle               │
└────────┬─────────────────────────┘
         │ HTTP POST /api/blogs
         │ (Title + Content JSON + Tags + JWT)
         │
         ▼
┌────────────────────────────────┐
│   Backend Auth Middleware      │
│ • Verify JWT Token             │
│ • Extract User ID              │
└────────┬─────────────────────────┘
         │ Authenticated Request
         │
         ▼
┌────────────────────────────────┐
│   Blog Controller              │
│ • Validate Title & Content     │
│ • Generate Slug                │
│ • Assign Author ID             │
└────────┬─────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│   Database (MongoDB)           │
│ • Create Blog Document         │
│ • Store Author Reference       │
│ • Save Metadata                │
└────────┬─────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│   Backend Response             │
│ • Return Blog Document         │
│ • Include Slug & ID            │
│ • Publish Status               │
└────────┬─────────────────────────┘
         │ HTTP Response
         │
         ▼
┌────────────────────────────────┐
│   Frontend (React)             │
│ • Redirect to Blog View        │
│ • Display Success Message      │
│ • Show Blog Preview            │
└────────────────────────────────┘
```

---

## User Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                          │
└─────────────────────────────────────────────────────────────────┘

REGISTRATION:
User Data ──► Frontend ──► Backend ──► Hash Password ──► MongoDB
              (Form)      (Validate)   (bcrypt)         (Store)
                                                            │
                                          JWT Generated ◄──┘
                                                │
                          ◄──────────────────────┘
                          │
                    Frontend (Store in localStorage)
                          │
                    Token in Header


LOGIN:
Email + Pass ──► Frontend ──► Backend ──► Compare Hash ──► Match?
                 (Form)       (Validate)   (bcrypt)        │
                                                      Yes◄──┴──No
                                                      │       │
                                          JWT Token───┘    Reject


AUTHENTICATED REQUEST:
Request + Token ──► Frontend ──► Backend ──► Middleware ──► Verify JWT
                    (Header)                 (auth.js)       │
                                                          │
                                           Valid?◄────────┤
                                           │              │
                                      Yes  │    No        │
                                      ▼    ▼        ▼
                                  Process  Return 401
                                 Request   Unauthorized
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────────────────┐
│              GitHub Repository                       │
│  (Source Code + Version Control)                     │
└──────────┬───────────────────────────────────────────┘
           │ Push to Main Branch
           │
    ┌──────▼──────────────────────────────────────────┐
    │          Vercel (Deployment)                    │
    │  ┌─────────────────────────────────────────┐   │
    │  │ Frontend (React + Vite)                 │   │
    │  │ • Static Site Generation                │   │
    │  │ • CDN Distribution                      │   │
    │  │ • Auto Redeploy on Push                 │   │
    │  └─────────────────────────────────────────┘   │
    │  ┌─────────────────────────────────────────┐   │
    │  │ Backend (Node.js Serverless)            │   │
    │  │ • API Routes as Functions               │   │
    │  │ • Auto Scaling                          │   │
    │  │ • Environment Variables                 │   │
    │  └─────────────────────────────────────────┘   │
    └──────┬───────────────────────────────────────────┘
           │
    ┌──────▼──────────────────────────────────────────┐
    │      MongoDB Atlas (Cloud Database)             │
    │  • Hosted MongoDB Instance                      │
    │  • Auto Backups                                 │
    │  • Connection Pooling                           │
    │  • SSL/TLS Encryption                           │
    └──────────────────────────────────────────────────┘
```

