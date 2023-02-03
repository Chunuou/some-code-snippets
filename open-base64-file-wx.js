/**
 * 在微信小程序中打开以 Base64 字符串形式传输的文件。
 * 由于微信小程序文件系统限制，需要手动清理文件，避免存储空间不足。
 */

const fsm = wx.getFileSystemManager();
const dirPath = `${wx.env.USER_DATA_PATH}/document`;

/**
 * 创建文件夹，写入文件，打开文件
 * @param {string} filePath 文件路径
 * @param {string} base64 Base64 字符串形式的文件数据
 * @param {string} fileType 文件类型
 */
function makeWriteOpen(filePath, base64, fileType) {
  fsm.mkdir({
    dirPath,
    fail() {
      uni.showToast({ title: "存储文件夹创建失败", icon: "none" });
    },
    success() {
      fsm.writeFile({
        filePath,
        data: base64,
        encoding: "base64",
        fail() {
          uni.showToast({ title: "文件写入失败", icon: "none" });
        },
        success() {
          switch (fileType) {
            case "jpg":
            case "jpeg":
            case "png":
              wx.previewImage({
                urls: [filePath],
                fail() {
                  uni.showToast({ title: "图片打开失败", icon: "none" });
                },
              });
              break;

            case "doc":
            case "docx":
            case "xls":
            case "xlsx":
            case "ppt":
            case "pptx":
            case "pdf":
              wx.openDocument({
                filePath: filePath,
                fileType: fileType,
                showMenu: true,
                fail() {
                  uni.showToast({ title: "文件打开失败", icon: "none" });
                },
              });
              break;

            default:
              uni.showModal({
                title: "提示",
                content: "不支持的文件类型",
                showCancel: false,
              });
              break;
          }
        },
      });
    },
  });
}

/**
 * 打开 Base64 字符串形式的文件
 * @param {string} fileId - 文件 ID
 * @param {string} fileType - 文件类型
 * @param {string} base64 - Base64 字符串形式的文件数据
 */
function openBase64File(fileId, fileType, base64) {
  const filePath = `${dirPath}/${fileId}.${fileType}`;

  fsm.access({
    path: dirPath,
    fail() {
      makeWriteOpen(filePath, base64, fileType);
    },
    success() {
      fsm.rmdir({
        dirPath,
        recursive: true,
        fail() {
          uni.showToast({
            title: "存储文件夹清理失败",
            icon: "none",
          });
        },
        success() {
          makeWriteOpen(filePath, base64, fileType);
        },
      });
    },
  });
}
