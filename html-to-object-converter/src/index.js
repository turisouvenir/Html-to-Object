// Function to convert an HTML string to an object
function htmlToObject(html) {
  const isBrowser = typeof window !== "undefined";

  if (isBrowser) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return parseElement(doc.body.firstChild);
  } else {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const dom = new JSDOM(html);
    const document = dom.window.document;

    return parseElement(document.body.firstChild);
  }
}
// Helper function to recursively parse HTML elements
function parseElement(element) {
  const obj = {
    tag: element.tagName.toLowerCase(),
  };

  // Check if there is an id attribute
  const idAttribute = element.getAttribute("id");
  if (idAttribute) {
    obj.id = idAttribute;
  }

  // Check if there is a direct text child node
  const directTextChild = Array.from(element.childNodes).find(
    (node) => node.nodeType === 3 && node.textContent.trim() !== ""
  );
  if (directTextChild) {
    obj.text = directTextChild.textContent.trim();
  }

  // Recursively process non-empty children elements
  const nonEmptyChildren = Array.from(element.children)
    .map(parseElement)
    .filter((child) => !!child.text || !!child.children);

  // Add style property if styles are present
  const styles = parseStyles(element.getAttribute("style"));
  if (Object.keys(styles).length > 0) {
    obj.style = styles;
  }

  if (nonEmptyChildren.length > 0) {
    obj.children = nonEmptyChildren;
  }

  return obj;
}

// Helper function to parse styles attribute into an object
function parseStyles(styleAttr) {
  if (!styleAttr) return {};

  return styleAttr.split(";").reduce((styleObj, style) => {
    const [key, value] = style.split(":").map((s) => s.trim());
    if (key && value) {
      styleObj[camelCase(key)] = value;
    }
    return styleObj;
  }, {});
}

// Helper function to convert a string to camelCase
function camelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

module.exports = htmlToObject;
