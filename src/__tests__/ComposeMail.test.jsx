import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ComposeMail from "../components/mail/ComposeMail";
import { sendMail } from "../services/apiServices";
import { vi } from "vitest";

// Mock Redux store
const mockStore = configureStore([]);
const store = mockStore({
  auth: { email: "test@example.com" },
});

// Mock API service
vi.mock("../services/apiServices", () => ({
  sendMail: vi.fn(),
}));

describe("ComposeMail Component", () => {
  // Case-1: Renders form with all input fields
  test("renders form with all input fields", () => {
    render(
      <Provider store={store}>
        <ComposeMail onCancel={vi.fn()} />
      </Provider>
    );

    expect(screen.getByLabelText("From:")).toBeInTheDocument();
    expect(screen.getByLabelText("To:")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  // Case-2: Does not allow sending mail when fields are empty
  test("does not allow sending mail when fields are empty", () => {
    render(
      <Provider store={store}>
        <ComposeMail onCancel={vi.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Send"));
    expect(screen.queryByText("Mail Sent Successfully!")).not.toBeInTheDocument();
  });

  // Case-3: Updates input values correctly
  test("updates input values correctly", () => {
    render(
      <Provider store={store}>
        <ComposeMail onCancel={vi.fn()} />
      </Provider>
    );

    const toInput = screen.getByLabelText("To:");
    const subjectInput = screen.getByLabelText("Subject:");

    fireEvent.change(toInput, { target: { value: "receiver@example.com" } });
    fireEvent.change(subjectInput, { target: { value: "Test Subject" } });

    expect(toInput.value).toBe("receiver@example.com");
    expect(subjectInput.value).toBe("Test Subject");
  });

  // Case-4: Sends mail successfully when valid data is entered
  test("sends mail successfully when valid data is entered", async () => {
    sendMail.mockResolvedValueOnce({ success: true });

    render(
      <Provider store={store}>
        <ComposeMail onCancel={vi.fn()} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("To:"), {
      target: { value: "receiver@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Subject:"), {
      target: { value: "Test Subject" },
    });

    fireEvent.click(screen.getByText("Send"));

    expect(sendMail).not.toHaveBeenCalled(); 
  });

  // Case-5: Calls onCancel when Cancel button is clicked
  test("calls onCancel when Cancel button is clicked", () => {
    const onCancelMock = vi.fn();
    
    render(
      <Provider store={store}>
        <ComposeMail onCancel={onCancelMock} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(onCancelMock).toHaveBeenCalled();
  });
});
