import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from "../App";

const mockStore = configureMockStore([]);
const store = mockStore({}); // Initialize the mock Redux store

// Using "describe()" to group related tests together
describe("Header component", () => {
    
    // Case 1: Checking logo is present or not
    test('render main navigation', () => {
        
        // Arrange 
        render(
            // As MainNavigation is using a useNavigate hook, so we need to wrap it in a BrowserRouter
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        // Assert
        const logo = screen.getByText('Mail Box', { exact: false });
        expect(logo).toBeInTheDocument();
    });

    // Case 2: Checking if the signup page (login page) is rendered when navigating to "/login"
    test('renders login page on "/login" route', () => {
        
        // Arrange
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        // Act: Click on the login button in the header
        const loginButton = screen.getByRole('link', { name: /login/i }); // This targets the login button by its role and name
        fireEvent.click(loginButton); // Simulate a click on the login button

         // Assert: Check if the login form is rendered
        const loginHeader = screen.getByRole('heading', { name: /login/i }); // Targets the h1 element with "Login"
        expect(loginHeader).toBeInTheDocument(); // To check if the login page is rendered when navigating to "/login"
    });
});
