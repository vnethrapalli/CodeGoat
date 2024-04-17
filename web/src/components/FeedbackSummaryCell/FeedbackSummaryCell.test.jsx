import { render, screen } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from './FeedbackSummaryCell'
import { standard, single, empty } from './FeedbackSummaryCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('FeedbackSummaryCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  // When you're ready to test the actual output of your component render
  // you could test that, for example, certain text is present:
  //
  // 1. import { screen } from '@redwoodjs/testing/web'
  // 2. Add test: expect(screen.getByText('Hello, world')).toBeInTheDocument()

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success feedbackSummary={standard().feedbackSummary} />)
    }).not.toThrow()
  })
});

describe('Feedback Summary Cell render tests', () => {
  it('correctly displays all text elements correctly under normal conditions', () => {
    let feedbackSummary = standard().feedbackSummary;
    render(<Success feedbackSummary={feedbackSummary} />);

    expect(screen.getByTestId("feedback-summary-header")).toHaveTextContent(`Hear ${feedbackSummary.count} Ratings From Our Users`);

    expect(screen.getByTestId("submission-page-header")).toHaveTextContent(`Submission Page (${feedbackSummary.submissionPageAvg})`);
    expect(screen.getByTestId("submission-page-stars")).toBeInTheDocument();

    expect(screen.getByTestId("output-page-header")).toHaveTextContent(`Output Page (${feedbackSummary.outputPageAvg})`);
    expect(screen.getByTestId("output-page-stars")).toBeInTheDocument();

    expect(screen.getByTestId("accuracy-header")).toHaveTextContent(`Translation Accuracy (${feedbackSummary.translationAccuracyAvg})`);
    expect(screen.getByTestId("accuracy-stars")).toBeInTheDocument();

    expect(screen.getByTestId("gpt-availability-header")).toHaveTextContent(`GPT Availability (${feedbackSummary.gptAvailabilityAvg})`);
    expect(screen.getByTestId("gpt-availability-stars")).toBeInTheDocument();

    expect(screen.getByTestId("experience-header")).toHaveTextContent(`Overall Experience (${feedbackSummary.experienceAvg})`);
    expect(screen.getByTestId("experience-stars")).toBeInTheDocument();
  });

  it('correctly DOES NOT display the text elements when there are no feedbacks', () => {
    let feedbackSummary = empty().feedbackSummary;
    render(<Success feedbackSummary={feedbackSummary} />);

    expect(screen.queryByTestId("feedback-summary-header")).not.toBeInTheDocument();

    expect(screen.queryByTestId("submission-page-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("submission-page-stars")).not.toBeInTheDocument();

    expect(screen.queryByTestId("output-page-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("output-page-stars")).not.toBeInTheDocument();

    expect(screen.queryByTestId("accuracy-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("accuracy-stars")).not.toBeInTheDocument();

    expect(screen.queryByTestId("gpt-availability-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("gpt-availability-stars")).not.toBeInTheDocument();

    expect(screen.queryByTestId("experience-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("experience-stars")).not.toBeInTheDocument();
  });

  it('correctly renders main header when there is a single feedback', () => {
    let feedbackSummary = single().feedbackSummary;
    render(<Success feedbackSummary={feedbackSummary} />);
    expect(screen.getByTestId("feedback-summary-header")).toHaveTextContent(`Hear ${feedbackSummary.count} Rating From Our Users`);
  })
});
