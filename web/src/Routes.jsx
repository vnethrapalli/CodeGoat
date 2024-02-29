// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { PrivateSet, Router, Route, Set } from '@redwoodjs/router'
import UserLayout from './layouts/UserLayout/UserLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet unauthenticated="home">
        <Set wrap={UserLayout}>
          <Route path="/translate" page={SubmissionPage} name="translate" />
          <Route path="/feedback" page={FeedbackPage} name="feedback" />
        </Set>
      </PrivateSet>

      <Set wrap={UserLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/status" page={StatusPage} name="status" />
        <Route path="/documentation" page={DocumentationPage} name="documentation" />
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
