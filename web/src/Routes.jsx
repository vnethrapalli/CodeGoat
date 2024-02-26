// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import UserLayout from './layouts/UserLayout/UserLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={UserLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/translate" page={TranslatePage} name="translate" />
        <Route path="/status" page={StatusPage} name="status" />
        <Route path="/feedback" page={FeedbackPage} name="feedback" />
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
