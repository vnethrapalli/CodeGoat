import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Form, TextField, TextAreaField, Submit, RadioField } from '@redwoodjs/forms'

const FeedbackPage = () => {
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <>
      <Metadata title="Feedback" description="Feedback page" />

      <h1>Feedback</h1>
      <Form onSubmit={onSubmit}>
        <label htmlFor="submissionPage">Submission Page</label>
        <div>
          <RadioField name="submissionPage" />
          <label>1</label>
        </div>
        <div>
          <RadioField name="submissionPage" />
          <label>2</label>
        </div>
        <div>
          <RadioField name="submissionPage" />
          <label>3</label>
        </div>
        <div>
          <RadioField name="submissionPage" />
          <label>4</label>
        </div>
        <div>
          <RadioField name="submissionPage" />
          <label>5</label>
        </div>

        <label htmlFor="outputPage">Output Page</label>
        <div>
          <RadioField name="outputPage" />
          <label>1</label>
        </div>
        <div>
          <RadioField name="outputPage" />
          <label>2</label>
        </div>
        <div>
          <RadioField name="outputPage" />
          <label>3</label>
        </div>
        <div>
          <RadioField name="outputPage" />
          <label>4</label>
        </div>
        <div>
          <RadioField name="outputPage" />
          <label>5</label>
        </div>

        <label htmlFor="translationAccuracy">Translation Accuracy</label>
        <div>
          <RadioField name="translationAccuracy" />
          <label>1</label>
        </div>
        <div>
          <RadioField name="translationAccuracy" />
          <label>2</label>
        </div>
        <div>
          <RadioField name="translationAccuracy" />
          <label>3</label>
        </div>
        <div>
          <RadioField name="translationAccuracy" />
          <label>4</label>
        </div>
        <div>
          <RadioField name="translationAccuracy" />
          <label>5</label>
        </div>

        <label htmlFor="gptAvailability">GPT-3 Availability</label>
        <div>
          <RadioField name="gptAccuracy" />
          <label>1</label>
        </div>
        <div>
          <RadioField name="gptAccuracy" />
          <label>2</label>
        </div>
        <div>
          <RadioField name="gptAccuracy" />
          <label>3</label>
        </div>
        <div>
          <RadioField name="gptAccuracy" />
          <label>4</label>
        </div>
        <div>
          <RadioField name="gptAccuracy" />
          <label>5</label>
        </div>

        <label htmlFor="experience">Overall Experience</label>
        <div>
          <RadioField name="experience" />
          <label>1</label>
        </div>
        <div>
          <RadioField name="experience" />
          <label>2</label>
        </div>
        <div>
          <RadioField name="experience" />
          <label>3</label>
        </div>
        <div>
          <RadioField name="experience" />
          <label>4</label>
        </div>
        <div>
          <RadioField name="experience" />
          <label>5</label>
        </div>
        
        

        <label htmlFor="comments">Additional Comments</label>
        <br></br>
        <TextAreaField name="comments" />
        <br></br>
        <div>
          <Submit> Submit</Submit>
        </div>
        
      </Form>
    </>
  )
}

export default FeedbackPage
