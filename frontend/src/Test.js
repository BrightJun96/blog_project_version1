import React from "react";
import sanitizeHtml from "sanitize-html";

const Test = () => {
  const h1Tag = "<h1>Hello World</h1>";

  const filteredTag = sanitizeHtml(h1Tag, {
    allowedTags: [],
  });

  console.log(typeof filteredTag);
  return <div></div>;
};

export default Test;
