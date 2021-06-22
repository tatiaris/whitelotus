import { allTemplateInfo } from './Templates';

/**
 * Style text based on identifiers:
 * some *bolded* text is *here*
 *    ==> <>some <span style={{ fontWeight: boldWeight }}>bolded</span> text is <span style={{ fontWeight: boldWeight }}>here</span></>
 * some _italic_ text is _here_
 *    ==> <>some <i>italic</i> text is <i>here</i></>
 * some _*fancy*_ text is _*here*_
 *    ==> <>some <span style={{ fontWeight: boldWeight }}><i>fancy</i></span> text is <span style={{ fontWeight: boldWeight }}><i>here</i></span></>
 *
 * @param text {string}
 * @param boldWeight {int}
 */
export const styleText = (text, boldWeight) => {
  const jsxElements = [];
  let c = 0;
  try {
    while (text.indexOf('_') > -1 || text.indexOf('*') > -1) {
      c++;
      const italicStartIndex = text.indexOf('_');
      const boldStartIndex = text.indexOf('*');
      let plainTextEndIndex = 0;
      let styleType = '';

      if (italicStartIndex > -1 && boldStartIndex > -1) {
        if (italicStartIndex < boldStartIndex) {
          plainTextEndIndex = italicStartIndex;
          styleType = '_';
        } else {
          plainTextEndIndex = boldStartIndex;
          styleType = '*';
        }
      } else {
        if (italicStartIndex > boldStartIndex) {
          plainTextEndIndex = italicStartIndex;
          styleType = '_';
        } else {
          plainTextEndIndex = boldStartIndex;
          styleType = '*';
        }
      }

      const plainText = text.substr(0, plainTextEndIndex);
      text = text.substr(plainTextEndIndex + 1);
      const fancyTextEndIndex = text.indexOf(styleType);
      const fancyText = text.substr(0, fancyTextEndIndex);
      text = text.substr(fancyTextEndIndex + 1);

      jsxElements.push(<span key={`plain-text-${c}`}>{plainText}</span>);
      if (styleType == '*')
        jsxElements.push(
          <span key={`fancy-text-${c}`} style={{ fontWeight: boldWeight }}>
            {fancyText}
          </span>
        );
      else if (styleType == '_') jsxElements.push(<i key={`fancy-text-${c}`}>{styleText(fancyText, boldWeight)}</i>);
    }
    jsxElements.push(<span key={`plain-text-${c + 1}`}>{text}</span>);
  } catch (error) {
    console.log(error);
    jsxElements.push(text);
  }

  return jsxElements;
};

const launchSuccessToast = (setToast, msg) => setToast({ text: msg, type: 'warning', delay: 3000 });
const launchFailToast = (setToast, msg) => setToast({ text: msg, type: 'error', delay: 3000 });
/**
 * sends a user a positive/negative notification
 * @param  {bool} intent good or bad
 * @param {string} msg message to send as a notification
 */
const sendNotification = (setToast, intent, msg) => {
  console.log('sending notification');

  if (intent) launchSuccessToast(setToast, msg);
  else launchFailToast(setToast, msg);
};

/**
 * updates the user's info in the database
 */
export const updateDatabase = (objectType, updatedObject, setToast, notify = false) => {
  fetch(`/api/${objectType}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ updatedObject: updatedObject })
  })
    .then((response) => response.json())
    .then((data) => {
      if (notify) sendNotification(setToast, data.success, data.message);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export const updateUserDataDB = (allUserData, userInfo, setToast, notify = false) => {
  allUserData.data = userInfo;
  updateDatabase('users', allUserData, setToast, true);
};

/**
 * Modifies user's data according to the template and sets variables to be used on the page
 * @param templateInfo {string[]}
 * @param setAllUserData {function}
 * @param setUserInfo {function}
 */
export const loadAllUserData = async (templateInfo, setAllUserData, setUserInfo) => {
  const userInfoRes = await fetch('/api/users?type=self');
  const userData = await userInfoRes.json();
  if (userData) {
    for (let i = 0; i < templateInfo.fields.length; i++) {
      const f = templateInfo.fields[i];
      if (!(f in userData.data)) userData.data[f] = '';
    }
    setAllUserData(userData);
    setUserInfo(userData.data);
  }
};

export const loadAllDBTemplateData = async (setAllTemplateDBInfo) => {
  const res = await fetch(`/api/templates?amount=all`);
  let allTemplateDBData = await res.json();
  allTemplateDBData = allTemplateDBData.map((data) => {
    data.tags = new Set(allTemplateInfo[data.templateId].about.tags);
    return data;
  });
  setAllTemplateDBInfo(allTemplateDBData);
};

export const loadDBTemplateData = async (templateId, setTemplateDBInfo) => {
  const templateInfoRes = await fetch(`/api/templates?amount=single&filter=templateId&templateId=${templateId}`);
  const templateDBData = await templateInfoRes.json();
  setTemplateDBInfo(templateDBData);
};

/**
 * allows the user to print/download their resume through the browser
 */
export const printPDF = (templateDBInfo, setTemplateDBInfo, setToast) => {
  const resumeElement = document.getElementById('resume-container');
  // method 1: no api, just let the browser print
  const raw_html = resumeElement.outerHTML;
  const w = window.open();
  w.document.write(raw_html);
  w.focus();
  w.print();
  w.close();
  incrementTemplateDownloads(templateDBInfo, setTemplateDBInfo, setToast);
};

/**
 * creates a html file containing the resume's source code and downloads it for the user
 */
export const downloadHtml = () => {
  const filename = 'resume_html.html';
  const html_content = document.getElementById('resume-container').outerHTML;
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html_content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const modifyFavoriteTemplates = (add, templateId, allUserData, setAllUserData, templateDBInfo, setTemplateDBInfo, setToast) => {
  if (add) {
    allUserData.liked_templates[templateId] = true;
    templateDBInfo['likes'] += 1;
  } else {
    delete allUserData.liked_templates[templateId];
    templateDBInfo['likes'] -= 1;
  }
  updateDatabase('users', allUserData, setToast, true);
  updateDatabase('templates', templateDBInfo, setToast, false);
  setAllUserData(allUserData);
  setTemplateDBInfo(templateDBInfo);
};

export const incrementTemplateDownloads = (templateDBInfo, setTemplateDBInfo, setToast) => {
  templateDBInfo['downloads'] += 1;
  updateDatabase('templates', templateDBInfo, setToast, false);
  setTemplateDBInfo(templateDBInfo);
};

export const loadNewTemplate = (templateId, setTemplateInfo) => {
  console.log(`loading new template ${templateId}`);
  setTemplateInfo(allTemplateInfo[templateId].about);
  window.location.replace(`/t/${templateId}`);
};

export const isSubset = (setA, setB) => {
  for (const elem of setB) {
    if (!setA.has(elem)) {
      return false;
    }
  }
  return true;
};

export const hasNoCommon = (setA, setB) => {
  for (const elem of setB) {
    if (setA.has(elem)) {
      return false;
    }
  }
  return true;
};

/**
 * Generates and downloads the pdf created using the template output
 * multiple ways to do this, but currently just sending a request
 * to my own html2pdf api comtaining the code to be converted.
 */
// const generatePDF = async () => {
//   launchBasicToast('Generating PDF...');
//   if (document) {
//     const resumeElement = document.getElementById('code-output');

//     // method 2: use html-pdf-node to generate pdf
//     try {
//       const data = await axios({
//         method: 'POST',
//         url: 'https://html2pdfapi.herokuapp.com/',
//         // url: 'http://localhost:8000/',
//         headers: {
//           Accept: '*/*',
//           'Access-Control-Allow-Origin': '*'
//         },
//         data: {
//           raw_html: encodeURIComponent(resumeElement.innerHTML),
//           pageHeight: resumeElement.offsetHeight
//         },
//         responseType: 'blob'
//       });
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(data.data);
//       link.download = 'resuville.pdf';
//       document.body.append(link);
//       link.click();
//       link.remove();
//       setTimeout(() => URL.revokeObjectURL(link.href), 7000);
//       incrementTemplateDownloadCount();
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };
