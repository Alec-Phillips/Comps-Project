import { render, screen } from '@testing-library/react';
import ServerTest from './serverTest';


test('sends code to flask server', () => {
    render(<ServerTest  />);
    const check = screen.getByText(/'response': 'recieved post'/i);
    expect(check).toBeInTheDocument();
});