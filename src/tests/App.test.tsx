import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Container tests', () => {
  test('App renders correctly', () => {

    const { container } = render(<App />);
    const title = screen.getByText('Oslo Bikes');

    expect(title).toBeInTheDocument();
    expect(container.children[0].children[1]).toHaveClass('leaflet-container');
  });
});
