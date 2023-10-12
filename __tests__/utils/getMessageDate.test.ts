import { getMessageDate } from '../../app/core/utils/getMessageDate';

describe('getMessageDate', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('when date is in past', () => {
    jest.useFakeTimers().setSystemTime(new Date(2023, 0, 0));
    const date = getMessageDate(new Date(2022, 9, 1, 23, 30));
    expect(date).toBe('01/10/2022');
  });

  test('when date is equal today date', () => {
    jest.useFakeTimers().setSystemTime(new Date(2023, 8, 16, 9, 36, 57));
    const time = getMessageDate(new Date());
    expect(time).toBe('09:36');
  });

  test('when date is in past and option full is provided', () => {
    jest.useFakeTimers().setSystemTime(new Date(2023, 0, 0));
    const time = getMessageDate(new Date(2022, 9, 1, 23, 2), { full: true });
    expect(time).toBe('01/10/2022 23:02');
  });

  test('when date is equal today date and option full is provided', () => {
    jest.useFakeTimers().setSystemTime(new Date(2023, 8, 16, 9, 36, 57));
    const time = getMessageDate(new Date(), { full: true });
    expect(time).toBe('09:36');
  });
});
