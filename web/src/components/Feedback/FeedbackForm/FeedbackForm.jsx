import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const FeedbackForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.feedback?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="submissionPage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Submission page
        </Label>

        <NumberField
          name="submissionPage"
          defaultValue={props.feedback?.submissionPage}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="submissionPage" className="rw-field-error" />

        <Label
          name="outputPage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Output page
        </Label>

        <NumberField
          name="outputPage"
          defaultValue={props.feedback?.outputPage}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="outputPage" className="rw-field-error" />

        <Label
          name="translationAccuracy"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Translation accuracy
        </Label>

        <NumberField
          name="translationAccuracy"
          defaultValue={props.feedback?.translationAccuracy}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="translationAccuracy" className="rw-field-error" />

        <Label
          name="gptAvailability"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gpt availability
        </Label>

        <NumberField
          name="gptAvailability"
          defaultValue={props.feedback?.gptAvailability}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="gptAvailability" className="rw-field-error" />

        <Label
          name="experience"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Experience
        </Label>

        <NumberField
          name="experience"
          defaultValue={props.feedback?.experience}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="experience" className="rw-field-error" />

        <Label
          name="comments"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Comments
        </Label>

        <TextField
          name="comments"
          defaultValue={props.feedback?.comments}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="comments" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FeedbackForm
