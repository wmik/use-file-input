import React, { type CSSProperties } from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useFileInput } from '../src/index';

const LABEL_TEXT = 'Click or drag/drop files to upload';
const PLACEHOLDER_TEXT = 'No files';

function FileInputComponent() {
  let { fileInputRef, files, onFileInputChange } = useFileInput();
  let hasFiles = Array.from(files?.values() ?? [])?.length > 0;

  let styles: Record<string, CSSProperties> = {
    container: {
      width: 400,
      height: 400,
      border: '1px dashed #dddccc'
    },
    input: {
      display: 'none'
    },
    list: {
      display: hasFiles ? 'block' : 'none'
    },
    placeholder: {
      display: !hasFiles ? 'block' : 'none'
    }
  };

  return (
    <main>
      <div style={styles.container}>
        <label htmlFor="files" children={LABEL_TEXT} />
        <input
          name="files"
          id="files"
          type="file"
          ref={fileInputRef}
          style={styles.input}
          multiple
          onChange={onFileInputChange}
        />
      </div>

      <ul style={styles.list}>
        {Array.from(files.values())?.map(file => (
          <li key={file?.name}>
            <span children={file?.name} />
            <button
              type="button"
              aria-roledescription="delete"
              onClick={() => files.delete(file)}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>

      <p style={styles.placeholder} children={PLACEHOLDER_TEXT} />
    </main>
  );
}

describe('integration tests', () => {
  it('should render the component correctly', () => {
    render(<FileInputComponent />);
    expect(screen.getByText(LABEL_TEXT)).toBeInTheDocument();
  });

  it('should upload files correctly', async () => {
    let user = userEvent.setup();
    let file = new File(['lorem ipsum dolor sit amet'], 'test.txt', {
      type: 'text/plain'
    });

    render(<FileInputComponent />);

    let input = screen.getByLabelText(LABEL_TEXT) as HTMLInputElement;
    let placeholder = screen.getByText(PLACEHOLDER_TEXT);

    expect(input).toBeInTheDocument();
    expect(placeholder).toHaveStyle({ display: 'block' });

    await user.upload(input, file);

    expect(input.files?.length).toBe(1);
    expect(placeholder).toHaveStyle({ display: 'none' });

    let [upload] = Array.from(input.files ?? []);

    expect(upload).toBe(file);
    expect(screen.getByText(upload?.name)).toBeInTheDocument();

    let button = screen.getByText('DELETE');

    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(placeholder).toHaveStyle({ display: 'block' });
  });
});
