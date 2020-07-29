// packages
const { load } = require('archieml');
const { GoogleAuth } = require('google-auth-library');

function readParagraphElement(element, formatter) {
  // pull out the text
  const textRun = element.textRun;

  // sometimes it's not there, skip this all if so
  if (textRun) {
    // sometimes the content isn't there, and if so, make it an empty string
    const content = textRun.content || '';

    if (textRun.textStyle) {
      return formatter(content, textRun.textStyle);
    } else {
      return content;
    }
  } else {
    return '';
  }
}

function readElements(document, formatter) {
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
          text += `${prefix}${readParagraphElement(value, formatter)}`;
        });
      }
    }
  });

  return text;
}

function defaultFormatter(content, textStyle) {
  if (textStyle.link && textStyle.link.url) {
    return `<a href="${textStyle.link.url}">${content}</a>`;
  }

  return content;
}

async function docToArchieML({ client, documentId }) {
  // if a client is not provided, we'll attempt to create our own
  if (!client) {
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/documents.readonly'],
    });

    client = await auth.getClient();
  }

  // prepare the request URL
  const url = `https://docs.googleapis.com/v1/documents/${documentId}`;

  // pull the data out of the doc
  const { data } = await client.request({ url });

  // convert the doc's content to text ArchieML will understand
  const text = readElements(data, defaultFormatter);

  // pass text to ArchieML and return results
  return load(text);
}

module.exports = { docToArchieML };
