import { render } from "@testing-library/react";
import Author from "@/components/Author";

it("renders author and source name", () => {
  const { container } = render(
    <Author author="Jandsu Silva" sourceName="Uai News" />
  );
  expect(container).toMatchSnapshot();
});

it("renders author without source name", () => {
  const { container } = render(<Author author="Jandsu Silva" sourceName="" />);
  expect(container).toMatchSnapshot();
});
