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
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet unauthenticated="home">
        <Set wrap={UserLayout}>
          <Route path="/translate" page={TranslatePage} name="translate" />
          <Route path="/feedback" page={FeedbackPage} name="feedback" />
          <Route path="/submission" page={SubmissionPage} name="submission" />
        </Set>
      </PrivateSet>
        
      <Set wrap={UserLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/status" page={StatusPage} name="status" />
      </Set>

      // This is scaffold for test feedback inputs; I'd rather keep it in but not necessary
      <Set wrap={ScaffoldLayout} title="Feedbacks" titleTo="feedbacks" buttonLabel="New Feedback" buttonTo="newFeedback">
        <Route path="/feedbacks/new" page={FeedbackNewFeedbackPage} name="newFeedback" />
        <Route path="/feedbacks/{id:Int}/edit" page={FeedbackEditFeedbackPage} name="editFeedback" />
        <Route path="/feedbacks/{id:Int}" page={FeedbackFeedbackPage} name="feedback" />
        <Route path="/feedbacks" page={FeedbackFeedbacksPage} name="feedbacks" />
        <Route path="/status" page={StatusPage} name="status" />
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
