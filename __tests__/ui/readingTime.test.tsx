import { render } from "@testing-library/react";
import ReadingTime from "@/components/ReadingTime";

it("the reading time is rendered as 1 minute", () => {
  const { container } = render(<ReadingTime size={800} />);
  expect(container).toMatchSnapshot();
});

it("the reading time is rendered as 1 minute", () => {
  const { container } = render(<ReadingTime size={700} />);
  expect(container).toMatchSnapshot();
});

it("the reading time is rendered as 2 minutes", () => {
  const { container } = render(<ReadingTime size={850} />);
  expect(container).toMatchSnapshot();
});
