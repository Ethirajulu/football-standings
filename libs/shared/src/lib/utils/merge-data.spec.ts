import { describe, it, expect } from '@jest/globals';
import { mergeData } from './merge-data';

describe('mergeData', () => {
  it('should be defined', () => {
    expect(mergeData).toBeDefined();
  });

  describe('when data is a single object', () => {
    it('should merge customData into the data object', () => {
      const data = { id: '1', name: 'Alice' };
      const customData = { age: 30, city: 'New York' };
      const expected = { id: '1', name: 'Alice', age: 30, city: 'New York' };
      expect(mergeData(data, customData)).toEqual(expected);
    });

    it('should overwrite existing properties in data with values from customData', () => {
      const data = { id: '1', name: 'Alice', age: 25 };
      const customData = { age: 30, city: 'New York' };
      const expected = { id: '1', name: 'Alice', age: 30, city: 'New York' };
      expect(mergeData(data, customData)).toEqual(expected);
    });

    it('should not mutate the original data object', () => {
      const data = { id: '1', name: 'Alice' };
      const originalData = { ...data };
      const customData = { age: 30 };
      mergeData(data, customData);
      expect(data).toEqual(originalData);
    });

    it('should handle an empty data object', () => {
      const data = {};
      const customData = { age: 30, city: 'New York' };
      const expected = { age: 30, city: 'New York' };
      expect(mergeData(data, customData)).toEqual(expected);
    });

    it('should handle an empty customData object', () => {
      const data = { id: '1', name: 'Alice' };
      const customData = {};
      const expected = { id: '1', name: 'Alice' };
      expect(mergeData(data, customData)).toEqual(expected);
    });
  });

  describe('when data is an array of objects', () => {
    it('should merge customData into each object in the array', () => {
      const data = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
      ];
      const customData = { age: 30, city: 'New York' };
      const expected = [
        { id: '1', name: 'Alice', age: 30, city: 'New York' },
        { id: '2', name: 'Bob', age: 30, city: 'New York' },
      ];
      expect(mergeData(data, customData)).toEqual(expected);
    });

    it('should overwrite existing properties in array objects with values from customData', () => {
      const data = [
        { id: '1', name: 'Alice', age: 25 },
        { id: '2', name: 'Bob', city: 'London' },
      ];
      const customData = { age: 30, city: 'New York' };
      const expected = [
        { id: '1', name: 'Alice', age: 30, city: 'New York' },
        { id: '2', name: 'Bob', age: 30, city: 'New York' },
      ];
      expect(mergeData(data, customData)).toEqual(expected);
    });

    it('should not mutate the original array or its objects', () => {
      const data = [{ id: '1', name: 'Alice' }];
      const originalData = JSON.parse(JSON.stringify(data)); // Deep clone
      const customData = { age: 30 };
      mergeData(data, customData);
      expect(data).toEqual(originalData);
    });

    it('should handle an empty data array', () => {
      const data: Array<Record<string, unknown>> = [];
      const customData = { age: 30, city: 'New York' };
      const expected: Array<Record<string, unknown>> = [];
      expect(mergeData(data, customData)).toEqual(expected);
    });

    it('should handle an empty customData object with an array', () => {
      const data = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
      ];
      const customData = {};
      const expected = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
      ];
      expect(mergeData(data, customData)).toEqual(expected);
    });
  });
});
