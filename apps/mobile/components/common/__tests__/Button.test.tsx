import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button>Press me</Button>);
    expect(getByText('Press me')).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button onPress={onPressMock}>Press me</Button>);
    
    fireEvent.press(getByText('Press me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders different variants correctly', () => {
    const { rerender, getByTestId } = render(
      <Button variant="primary" testID="button">Press me</Button>
    );
    expect(getByTestId('button')).toBeTruthy();

    rerender(<Button variant="secondary" testID="button">Press me</Button>);
    expect(getByTestId('button')).toBeTruthy();

    rerender(<Button variant="ghost" testID="button">Press me</Button>);
    expect(getByTestId('button')).toBeTruthy();
  });

  it('renders in disabled state', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={onPressMock}>Press me</Button>
    );
    
    fireEvent.press(getByText('Press me'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('renders with custom styles', () => {
    const { getByTestId } = render(
      <Button 
        testID="button"
        style={{ marginTop: 10 }}
      >
        Press me
      </Button>
    );
    expect(getByTestId('button')).toBeTruthy();
  });
}); 