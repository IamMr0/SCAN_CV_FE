import { render } from '@testing-library/react';
import App from './App';

// 1. Mock module AuthContext trước khi render App
// Lưu ý: Thay đổi './context/AuthContext' cho đúng với đường dẫn thực tế của bạn
jest.mock('./context/AuthContext', () => ({
  useAuth: () => ({
    user: { name: 'Test User' },
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));

test('renders without crashing', () => {
  // Vì đã mock useAuth ở trên, App sẽ không bị crash khi gọi hook này nữa
  render(<App />);
});