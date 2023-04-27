import { cleanup, render, screen } from "@testing-library/react"
import Header from "../../components/Header"
import matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
expect.extend(matchers);

beforeEach(() => {
    render(<Header/>)
})

afterEach(() => {
    cleanup()
})

it("renders component with links", () => {
    const labels = ["School App", "Edit a Form", "View Forms"];
    labels.map((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
    })
    
})