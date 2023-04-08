import "./App.css";
import { marked } from "marked";
import { useEffect, useState } from "react";
const placeholder = `INSTRUCCIONES
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

`;

const WindowLayout = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const changeSize = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={isOpen ? "window-open" : ""}>
      <div className="window">
        <div className="window__bar">
          <div className="window__title">
            <i className="fa fa-code"></i>
            <span>{title}</span>
          </div>
          <div className="window__buttons">
            <button className="window__button" onClick={changeSize}>
              {!isOpen ? (
                <i className="fa fa-up-right-and-down-left-from-center"></i>
              ) : (
                <i className="fa fa-down-left-and-up-right-to-center"></i>
              )}
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

const renderer = new marked.Renderer();
marked.setOptions({ breaks: true });

function App() {
  const [inputText, setInputText] = useState(placeholder);
  useEffect(() => {}, []);

  const onInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="editor container-sm">
          <WindowLayout title="Editor">
            <textarea
              className="editor__textarea"
              name="editor"
              value={inputText}
              onChange={onInputChange}
              id="editor"
              cols="30"
              rows="10"
            ></textarea>
          </WindowLayout>
        </div>
        <div className="preview container-md">
          <WindowLayout title="Preview">
            <div
              className="preview__area"
              id="preview"
              dangerouslySetInnerHTML={{
                __html: marked(inputText, { renderer: renderer }),
              }}
            />
          </WindowLayout>
        </div>
      </div>
    </div>
  );
}

export default App;
