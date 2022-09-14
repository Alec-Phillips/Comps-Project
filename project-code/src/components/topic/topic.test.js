import { render, screen } from '@testing-library/react';
import Topic from './topic';


test('renders correct topic from api', () => {
    render(<Topic  topic='Introduction'/>);
    const titleElement = screen.getByText(/Introduction/i);
    expect(titleElement).toBeInTheDocument();
});