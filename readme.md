# use-file-input

> React based hooks for html file type inputs with drag and drop support.

## Features

- 👀 Familiar API - Extends the Map API with minimal abstraction making it easy to use.
- 🖱️ Drag n Drop - Supports HTML [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API).
- 🎛️ Configurable - Adjust settings to match your requirements.
- 💅 Headless - Build your own custom user interface to fit your style.

## Installation

> `npm install @wmik/use-file-input`

## Example

```jsx
function FileInputComponent() {
  const LABEL_TEXT = 'Click or drag/drop files to upload';
  const PLACEHOLDER_TEXT = 'No files';

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
```

## API

### _`useFileInput` (Default export)_

Creates a custom file input object.

#### `Parameters` (FileInputProps)

| Property | Type       | Description         |
| -------- | ---------- | ------------------- |
| id       | `function` | Custom ID generator |

> _**NOTE**: **\*** means it is required_

#### `Returns` (FileInputHookObject)

| Property             | Type       | Description                                          |
| -------------------- | ---------- | ---------------------------------------------------- |
| id                   | `function` | Custom ID generator                                  |
| isDraggingOver       | `boolean`  | Dragging state                                       |
| onFileInputChange    | `function` | HTML change event handler                            |
| onFileInputDragStart | `function` | HTML dragstart event handler                         |
| onFileInputDragLeave | `function` | HTML dragleave event handler                         |
| onFileInputDragOver  | `function` | HTML dragover event handler                          |
| onFileInputDrop      | `function` | HTML drop event handler                              |
| fileInputRef         | `object`   | React referencing object for HTMLInputElement        |
| files                | `object`   | Map-like object for file I/O operations              |
| files.get            | `function` | Method to get a file from the cache                  |
| files.set            | `function` | Method to add a file to the cache                    |
| files.delete         | `function` | Method to add a remove a file from the cache         |
| files.clear          | `function` | Method to add a remove all files from the cache      |
| files.keys           | `function` | Method to list identifiers in the cache              |
| files.values         | `function` | Method to list files in the cache                    |
| files.entries        | `function` | Method to list identifier-file pairs in the cache    |
| files.has            | `function` | Method to check if an identifier exists in the cache |

## License

MIT &copy;2025
