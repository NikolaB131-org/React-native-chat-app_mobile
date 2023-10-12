import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import TextInputModal, { Props } from '../../app/shared/TextInputModal';

describe('TextInputModal', () => {
  jest.useFakeTimers();
  let props: Props;
  const user = userEvent.setup();

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    props = {
      titleText: 'title text',
      initialValue: 'initial value',
      placeholder: 'placeholder',
      isVisible: true,
      setIsVisible: jest.fn(),
      onConfirm: jest.fn(),
    };
  });

  test('rendered correctly', () => {
    render(<TextInputModal {...props} />);

    const titleElement = screen.getByText('title text');
    expect(titleElement).toBeVisible();

    const inputElementByValue = screen.getByDisplayValue('initial value');
    expect(inputElementByValue).toBeVisible();

    const inputElementByPlaceholder = screen.getByPlaceholderText('placeholder');
    expect(inputElementByPlaceholder).toBeVisible();

    const confirmButtonElement = screen.getByText('Confirm');
    expect(confirmButtonElement).toBeVisible();
  });

  test('press on wrapper', async () => {
    render(<TextInputModal {...props} />);

    const wrapperElement = screen.getByTestId('wrapper');
    await user.press(wrapperElement);
    expect(props.setIsVisible).toBeCalledWith(false);
  });

  test('press on confirm button', async () => {
    render(<TextInputModal {...props} />);

    const inputElement = screen.getByDisplayValue('initial value');
    await user.type(inputElement, '123');

    const confirmButtonElement = screen.getByTestId('confirmButton');
    await user.press(confirmButtonElement);

    expect(props.onConfirm).toBeCalledWith('initial value123');
    expect(props.setIsVisible).toBeCalledWith(false);

    const inputElementAfterType = screen.getByDisplayValue('initial value');
    expect(inputElementAfterType).toBeVisible();
  });
});
