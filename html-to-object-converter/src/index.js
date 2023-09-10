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

  // Handle the style attribute
  const styleAttr = element.getAttribute("style");
  if (styleAttr) {
    obj.style = parseStyles(styleAttr);
  }

  // Add other attributes to the object
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    if (attr.name !== "style") {
      // Check if the attribute value contains spaces and convert it to an array
      obj[attr.name] = attr.value.includes(" ")
        ? attr.value.split(" ")
        : attr.value;
    }
  }

  // Check if there is text content
  const textNodes = Array.from(element.childNodes).filter(
    (childNode) => childNode.nodeType === 3 && childNode.textContent.trim() !== ""
  );
  if (textNodes.length === 1) {
    obj.text = textNodes[0].textContent.trim();
  }

  // Handle self-closing elements
  if (element.childNodes.length === 0) {
    return obj;
  }

  // Recursively process children elements
  const children = Array.from(element.childNodes).map((childNode) => {
    if (childNode.nodeType === 1) {
      return parseElement(childNode);
    } else {
      return null;
    }
  }).filter(Boolean);

  if (children.length > 0) {
    obj.children = children;
  }

  return obj;
}

// Helper function to parse styles attribute into an object with camelCase property names
function parseStyles(styleAttr) {
  const styleObj = {};

  styleAttr.split(";").forEach((style) => {
    const [key, value] = style.split(":").map((s) => s.trim());
    if (key && value) {
      // Convert property name to camelCase
      styleObj[camelCase(key)] = value.includes(" ") ? value.split(" ") : value;
    }
  });

  return styleObj;
}

// Helper function to convert a string to camelCase
function camelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

module.exports = htmlToObject;
