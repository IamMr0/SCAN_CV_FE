import { render } from '@testing-library/react';
import App from './App';
import { AuthContext } from './context/AuthContext';

test('renders without crashing', () => {
  const mockAuthValue = {
    user: null,
    loading: false,
    login: jest.fn(),
    logout: jest.fn()
  };

  render(
    <AuthContext.Provider value={mockAuthValue}>
      <App />
    </AuthContext.Provider>
  );
});