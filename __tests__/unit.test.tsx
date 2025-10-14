import { renderHook } from '@testing-library/react';
import { useFileInput } from '../src/index';

describe('unit tests', () => {
  it('should export properties correctly', () => {
    let api = renderHook(() => useFileInput());

    expect(api.result.current).toHaveProperty('fileInputRef');
    expect(api.result.current).toHaveProperty('isDraggingOver');
    expect(api.result.current).toHaveProperty('onFileInputChange');
    expect(api.result.current).toHaveProperty('onFileInputDragStart');
    expect(api.result.current).toHaveProperty('onFileInputDragLeave');
    expect(api.result.current).toHaveProperty('onFileInputDragOver');
    expect(api.result.current).toHaveProperty('onFileInputDrop');
    expect(api.result.current).toHaveProperty('files');

    expect(api.result.current.files).toHaveProperty('get');
    expect(api.result.current.files).toHaveProperty('set');
    expect(api.result.current.files).toHaveProperty('delete');
    expect(api.result.current.files).toHaveProperty('clear');
    expect(api.result.current.files).toHaveProperty('values');
    expect(api.result.current.files).toHaveProperty('keys');
    expect(api.result.current.files).toHaveProperty('has');
    expect(api.result.current.files).toHaveProperty('entries');
  });
});
