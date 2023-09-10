const htmlToObject = require('../src/index');

describe('htmlToObject', () => {
  it('converts the provided HTML to the expected object structure (excluding undefined properties)', () => {
    const html = `
      <div style="background-color: yellow; font-size: 14px" id="first-div">
        Hello, friends
        <p class="para" style="font-family: monospace; font-size: 11px">
          Lorem ipsum dolor sit
        </p>
        <footer style="width: auto; height: 100px; color: blue">
          <span>
            This is the end
          </span>
        </footer>
      </div>
    `;

    const expectedObject = {
      "tag": "div",
      "id": "first-div",
      "text": "Hello, friends",
      "style": {
        "backgroundColor": "yellow",      
        "fontSize": "14px"
      },
      "children": [
        {
          "tag": "p",
          "text": "Lorem ipsum dolor sit",
          "style": {
            "fontFamily": "monospace",
            "fontSize": "11px"
          }
        },
        {
          "tag": "footer",
          "style": {
            "width": "auto",
            "height": "100px",
            "color": "blue"
          },
          "children": [
            {
              "tag": "span",
              "text": "This is the end"
            }
          ]
        }
      ]
    };
    const result = htmlToObject(html);
    expect(result).toEqual(expectedObject);
  });
});
