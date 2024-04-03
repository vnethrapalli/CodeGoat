# CodeGoat

This is the `Segmentation Cult`'s code translation project for CS490. This application will allow you to translate your code from one programming language to another programming language, and is powered by GPT-3 for the translation and code checking.


Here is what our project's file structure looks like.

```
├── api
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
        └── Routes.jsx
```

Redwood sets up the project with an `api` folder for the back end and the `web` folder for the front end. In the `web` folder, all the React components and their Storybook stories are stored. The `api` folder contains the Prisma schema, backend services, and files related to authentication.

## Our Application

### Getting Started

Once opening the website, you will find yourself on our landing page, which provides some general information about our application. From here, you can access the _Status_ page, which tells you about the availability of the ChatGPT API which powers our site. Addtionally you can visit our _Documentation_ page to see visual guides for how to use the platform, as well as answers to common questions about our service.

Before the code translation service can be used, you must create an account and ensure that you are logged in. For new users, click on the signup button on the top right of the navbar at the top and follow the indicated steps. Returning users can log in via the login button also at the right side of the navbar.

### Using our Service

Once logged in, you can access our code translation service! To get started, click the Translate button at the top to access the _Translate_ page. Choose the desired input and target language using the language dropdown menu. You will see a codebox to input your code to be translated. Type your code there, or upload your code file if you already have some code handy.

Once you are ready, hit the Translate button at the bottom of the page and watch your translated code appear in the output code box on the right! How did we do? Let us know using the feedback feature now available below the translate button. Choose the desired number of starts, and click on the button.

All of your translation history will be available for you to see if you click on your user icon in the top right of the screen, and then clicking "Translation History". This will take you to the _History_ page. This will include the input and out code that was submitted, the rating you provided (if one was provided), the input and output languagues, the date and time of the translation, and the API response (ie. 200 OK, etc).

### More Feedback

By clicking the "Feedback" text in the navbar, you will be taken to our _Feedback_ page. Here you will see various criteria by which you can provide a 1-10 rating of our system. We appreciate your feedback, so please do take a look at this! There is space to provide comments as well.

## Thank you! - CodeGoat Dev Team
