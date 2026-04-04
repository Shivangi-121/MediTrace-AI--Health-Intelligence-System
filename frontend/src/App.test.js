import { render, screen } from "@testing-library/react";

jest.mock("./components/ReportUpload", () => () => <div>Mock Upload Screen</div>);

import App from "./App";

test("renders MediTrace AI login screen", () => {
  render(<App />);
  expect(screen.getByText(/MediTrace AI/i)).toBeInTheDocument();
  expect(screen.getByText(/Secure Patient Health Account/i)).toBeInTheDocument();
});
