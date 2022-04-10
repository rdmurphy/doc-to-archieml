// packages
const { load } = require('archieml');

/**
 * @param {import('@googleapis/docs').docs_v1.Schema$ParagraphElement} element
 * @returns {string}
 */
function readParagraphElement(element) {
  // pull out the text
  const textRun = element.textRun;

  // sometimes it's not there, skip this all if so
  if (textRun) {
    // sometimes the content isn't there, and if so, make it an empty string
    const content = textRun.content || '';

    // step through optional text styles to check for an associated URL
    if (!textRun.textStyle) return content;
    if (!textRun.textStyle.link) return content;
    if (!textRun.textStyle.link.url) return content;

    // if we got this far there's a URL key, grab it...
    const url = textRun.textStyle.link.url;

    // ...but sometimes that's empty too
    if (url) {
      return `<a href="${url}">${content}</a>`;
    } else {
      return content;
    }
  } else {
    return '';
  }
}

/**
 * @param {import('@googleapis/docs').docs_v1.Schema$Document} document
 * @returns {string}
 */
function readElements(document) {
  // prepare the text holder
  let text = '';

  // check if the body key and content key exists, and give up if not
  if (!document.body) return text;
  if (!document.body.content) return text;

  // loop through each content element in the body
  document.body.content.forEach(element => {
    if (element.paragraph) {
      // get the paragraph within the element
      const paragraph = element.paragraph;

      // this is a list
      const needsBullet = paragraph.bullet != null;

      if (paragraph.elements) {
        // all values in the element
        const values = paragraph.elements;

        values.forEach((value, idx) => {
          // we only need to add a bullet to the first value, so we check
          const isFirstValue = idx === 0;

          // prepend an asterisk if this is a list item
          const prefix = needsBullet && isFirstValue ? '* ' : '';

          // concat the text
          text += `${prefix}${readParagraphElement(value)}`;
        });
      }
    }
  });

  return text;
}

/**
 *
 * @param {string} documentId
 * @param {import('google-auth-library').AuthClient} client
 * @returns {unknown}
 */
async function docToArchieML(documentId, client) {
  // pull the data out of the doc
  const { data } = await client.request({
    url: `https://docs.googleapis.com/v1/documents/${documentId}`,
  });

  // convert the doc's content to text ArchieML will understand
  const text = readElements(data);

  // pass text to ArchieML and return results
  return load(text);
}

module.exports = { docToArchieML };
