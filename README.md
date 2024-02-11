# CodeGoat

This is the `Segmentation Cult`'s code translation project for CS490. 

Here is what our project's file structure looks like.

```├── api
│   ├── db
│   │   └── schema.prisma
│   └── src
│       ├── directives
│       │   ├── requireAuth
│       │   └── skipAuth
│       ├── functions
│       │   └── graphql.js
│       ├── graphql
│       ├── lib
│       │   ├── auth.js
│       │   ├── db.js
│       │   └── logger.js
│       └── services
│
├── scripts
│   └── seed.js
│
└── web
    ├── public
    │   ├── favicon.png
    │   ├── README.md
    │   └── robots.txt
    └── src
        ├── components
        ├── layouts
        ├── pages
        │   ├── FatalErrorPage
        │   │   └── FatalErrorPage.jsx
        │   └── NotFoundPage
        │       └── NotFoundPage.jsx
        ├── App.jsx
        ├── entry.client.jsx
        ├── index.css
        ├── index.html
        └── Routes.jsx```

Redwood sets up the project with an `api` folder for the back end and the `web` folder for the front end. In the `web` folder, all the React components and their Storybook stories are stored. In the `api` folder, the Prisma schema is stored along with the stuff for authentication.