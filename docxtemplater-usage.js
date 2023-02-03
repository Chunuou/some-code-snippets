import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function nullGetter() {
  return "";
}

function getImageOpts() {
  return {
    centered: true,
    getImage(tagValue) {
      return new Promise(function (resolve, reject) {
        PizZipUtils.getBinaryContent(tagValue, function (error, content) {
          if (error) {
            return reject(error);
          }
          return resolve(content);
        });
      });
    },
    getSize() {
      return [125.82, 164.95];
    },
  };
}

function processData(rawData) {
  const data = { ...rawData };

  // do something

  return data;
}

function saveDocx(rawData) {
  PizZipUtils.getBinaryContent("/template.docx", function (error, content) {
    if (error) {
      throw error;
    }

    const zip = new PizZip(content);

    const imageOpts = getImageOpts();

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      nullGetter,
      modules: [new ImageModule(imageOpts)],
    });

    const data = processData(rawData);

    doc.renderAsync(data).then(function () {
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(out, `${new Date().getTime()}.docx`);
    });
  });
}
