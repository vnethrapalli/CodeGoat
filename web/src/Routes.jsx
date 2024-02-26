// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Feedbacks" titleTo="feedbacks" buttonLabel="New Feedback" buttonTo="newFeedback">
        <Route path="/feedbacks/new" page={FeedbackNewFeedbackPage} name="newFeedback" />
        <Route path="/feedbacks/{id:Int}/edit" page={FeedbackEditFeedbackPage} name="editFeedback" />
        <Route path="/feedbacks/{id:Int}" page={FeedbackFeedbackPage} name="feedback" />
        <Route path="/feedbacks" page={FeedbackFeedbacksPage} name="feedbacks" />
      </Set>
      <Route path="/feedback" page={FeedbackPage} name="feedback" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
