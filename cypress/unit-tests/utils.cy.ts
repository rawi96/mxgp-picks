import { classNames, dateToString, dateToStringForNativeInput, dateToStringWithTime } from '../../src/lib/utils/utils';

describe('Date Transformations', () => {
  it('should transform a date to a string properly', () => {
    const date = new Date('1996-03-12T00:00:00.000Z');
    const result = dateToString(date);
    expect(result).to.equal('12.3.1996');
  });

  it('should transform a date to a string with time properly', () => {
    const date = new Date('1996-03-12T10:30:15.000Z');
    const result = dateToStringWithTime(date);
    expect(result).to.equal('12.3.1996 - 11:30');
  });

  it('should transform a date to a string with time properly with leading zeros', () => {
    const date = new Date('1996-03-12T08:05:59.000Z');
    const result = dateToStringWithTime(date);
    expect(result).to.equal('12.3.1996 - 09:05');
  });

  it('should transform a date for the native input properly', () => {
    const date = new Date('1996-03-12T08:05:59.000Z');
    const result = dateToStringForNativeInput(date);
    expect(result).to.equal('1996-03-12');
  });
});

describe('Classnames', () => {
  it('should return a string with all classes', () => {
    const result = classNames('a', 'b', 'c');
    expect(result).to.equal('a b c');
  });
});
