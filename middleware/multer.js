const multer = require("multer");
const dir_name = process.cwd();
const fs = require("fs");
const _ = require("lodash");

const storage = multer.diskStorage({
  // Destination to store image
  destination: (req, file, cb) => {
    const path = dir_name + "/uploads/";
    fs.mkdirSync(path, { recursive: true });
    const newPath = dir_name + "/uploads/.tmp/";
    fs.mkdirSync(newPath, { recursive: true });
    return cb(null, newPath);
  },

  filename: async (req, file, cb) => {
    const newPath = dir_name + "/uploads/.tmp/";
    var ext = await mime2ext(file.mimetype);
    const { v4: uuidv4 } = require('uuid');
    const sessionId = uuidv4();
    req.sessionId = sessionId;
    var file_name = `${sessionId}.${ext}`;

    if (ext === "jpeg" || ext === "jpg" || ext === "heic") {
      cb(null, file_name);
    } else if (ext === "png") {
      cb(null, file_name);
    } else if (ext === "pdf" || ext === "csv") {
      cb(null, file_name);
    } else if (ext === "mp4") {
      cb(null, file_name);
    } else if (ext === "mov") {
      cb(null, file_name);
    } else if (ext === "gif") {
      cb(null, file_name);
    } else if (ext === "json") {
      cb(null, file_name);
    } else if (ext === "svg") {
      cb(null, file_name);
    } else if (ext === "docx") {
      cb(null, file_name);
    } else {
      return cb(new Error("Unsupported file format"));
    }
  },
});

const fileFilter = async (req, file, cb) => {
  const newPath = dir_name + "/uploads/.tmp/";
  var ext = await mime2ext(file.mimetype);
  const { v4: uuidv4 } = require('uuid');
  const sessionId = uuidv4();
  var file_name = `${sessionId}.${ext}`;

  if (ext === "jpeg" || ext === "jpg" || ext === "heic") {
    cb(null, file_name);
  } else if (ext === "png") {
    cb(null, file_name);
  } else if (ext === "pdf" || ext === "csv") {
    cb(null, file_name);
  } else if (ext === "mp4") {
    cb(null, file_name);
  } else if (ext === "mov") {
    cb(null, file_name);
  } else if (ext === "gif") {
    cb(null, file_name);
  } else if (ext === "json") {
    cb(null, file_name);
  } else if (ext === "svg") {
    cb(null, file_name);
  } else if (ext === "docx") {
    cb(null, file_name);
  } else {
    return cb(new Error("Unsupported file format"));
  }
};

const uploadImg = multer({
  storage: storage,
  limits: {
    fileSize: 50000000, //50MB
  },
  fileFilter: fileFilter,
});

async function mime2ext(mime) {
  let mime_map = {
    "video/3gpp2": "3g2",
    "video/3gp": "3gp",
    "video/3gpp": "3gp",
    "application/x-compressed": "7zip",
    "audio/x-acc": "aac",
    "audio/ac3": "ac3",
    "application/postscript": "ai",
    "audio/x-aiff": "aif",
    "audio/aiff": "aif",
    "audio/x-au": "au",
    "video/x-msvideo": "avi",
    "video/msvideo": "avi",
    "video/avi": "avi",
    "application/x-troff-msvideo": "avi",
    "application/macbinary": "bin",
    "application/mac-binary": "bin",
    "application/x-binary": "bin",
    "application/x-macbinary": "bin",
    "image/bmp": "bmp",
    "image/x-bmp": "bmp",
    "image/x-bitmap": "bmp",
    "image/x-xbitmap": "bmp",
    "image/x-win-bitmap": "bmp",
    "image/x-windows-bmp": "bmp",
    "image/ms-bmp": "bmp",
    "image/x-ms-bmp": "bmp",
    "application/bmp": "bmp",
    "application/x-bmp": "bmp",
    "application/x-win-bitmap": "bmp",
    "application/cdr": "cdr",
    "application/coreldraw": "cdr",
    "application/x-cdr": "cdr",
    "application/x-coreldraw": "cdr",
    "image/cdr": "cdr",
    "image/x-cdr": "cdr",
    "zz-application/zz-winassoc-cdr": "cdr",
    "application/mac-compactpro": "cpt",
    "application/pkix-crl": "crl",
    "application/pkcs-crl": "crl",
    "application/x-x509-ca-cert": "crt",
    "application/pkix-cert": "crt",
    "text/css": "css",
    "text/x-comma-separated-values": "csv",
    "text/comma-separated-values": "csv",
    "application/vnd.msexcel": "csv",
    "text/csv": "csv",
    "application/x-director": "dcr",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/x-dvi": "dvi",
    "message/rfc822": "eml",
    "application/x-msdownload": "exe",
    "video/x-f4v": "f4v",
    "audio/x-flac": "flac",
    "video/x-flv": "flv",
    "image/gif": "gif",
    "application/gpg-keys": "gpg",
    "application/x-gtar": "gtar",
    "application/x-gzip": "gzip",
    "application/mac-binhex40": "hqx",
    "application/mac-binhex": "hqx",
    "application/x-binhex40": "hqx",
    "application/x-mac-binhex40": "hqx",
    "text/html": "html",
    "image/x-icon": "ico",
    "image/x-ico": "ico",
    "image/vnd.microsoft.icon": "ico",
    "text/calendar": "ics",
    "application/java-archive": "jar",
    "application/x-java-application": "jar",
    "application/x-jar": "jar",
    "image/jp2": "jp2",
    "video/mj2": "jp2",
    "image/jpx": "jp2",
    "image/jpm": "jp2",
    "image/jpeg": "jpeg",
    "image/heic": "heic",
    "image/pjpeg": "jpeg",
    "application/x-javascript": "js",
    "application/json": "json",
    "text/json": "json",
    "application/vnd.google-earth.kml+xml": "kml",
    "application/vnd.google-earth.kmz": "kmz",
    "text/x-log": "log",
    "audio/x-m4a": "m4a",
    "audio/mp4": "m4a",
    "application/vnd.mpegurl": "m4u",
    "audio/midi": "mid",
    "application/vnd.mif": "mif",
    "video/quicktime": "mov",
    "video/x-sgi-movie": "movie",
    "audio/mpeg": "mp3",
    "audio/mpg": "mp3",
    "audio/mpeg3": "mp3",
    "audio/mp3": "mp3",
    "video/mp4": "mp4",
    "video/mpeg": "mpeg",
    "application/oda": "oda",
    "audio/ogg": "ogg",
    "video/ogg": "ogg",
    "application/ogg": "ogg",
    "font/otf": "otf",
    "application/x-pkcs10": "p10",
    "application/pkcs10": "p10",
    "application/x-pkcs12": "p12",
    "application/x-pkcs7-signature": "p7a",
    "application/pkcs7-mime": "p7c",
    "application/x-pkcs7-mime": "p7c",
    "application/x-pkcs7-certreqresp": "p7r",
    "application/pkcs7-signature": "p7s",
    "application/pdf": "pdf",
    "application/octet-stream": "pdf",
    "application/x-x509-user-cert": "pem",
    "application/x-pem-file": "pem",
    "application/pgp": "pgp",
    "application/x-httpd-php": "php",
    "application/php": "php",
    "application/x-php": "php",
    "text/php": "php",
    "text/x-php": "php",
    "application/x-httpd-php-source": "php",
    "image/png": "png",
    "image/x-png": "png",
    "application/powerpoint": "ppt",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.ms-office": "ppt",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "pptx",
    "application/x-photoshop": "psd",
    "image/vnd.adobe.photoshop": "psd",
    "audio/x-realaudio": "ra",
    "audio/x-pn-realaudio": "ram",
    "application/x-rar": "rar",
    "application/rar": "rar",
    "application/x-rar-compressed": "rar",
    "audio/x-pn-realaudio-plugin": "rpm",
    "application/x-pkcs7": "rsa",
    "text/rtf": "rtf",
    "text/richtext": "rtx",
    "video/vnd.rn-realvideo": "rv",
    "application/x-stuffit": "sit",
    "application/smil": "smil",
    "text/srt": "srt",
    "image/svg+xml": "svg",
    "application/x-shockwave-flash": "swf",
    "application/x-tar": "tar",
    "application/x-gzip-compressed": "tgz",
    "image/tiff": "tiff",
    "font/ttf": "ttf",
    "text/plain": "txt",
    "text/x-vcard": "vcf",
    "application/videolan": "vlc",
    "text/vtt": "vtt",
    "audio/x-wav": "wav",
    "audio/wave": "wav",
    "audio/wav": "wav",
    "application/wbxml": "wbxml",
    "video/webm": "webm",
    "image/webp": "webp",
    "audio/x-ms-wma": "wma",
    "application/wmlc": "wmlc",
    "video/x-ms-wmv": "wmv",
    "video/x-ms-asf": "wmv",
    "font/woff": "woff",
    "font/woff2": "woff2",
    "application/xhtml+xml": "xhtml",
    "application/excel": "xl",
    "application/msexcel": "xls",
    "application/x-msexcel": "xls",
    "application/x-ms-excel": "xls",
    "application/x-excel": "xls",
    "application/x-dos_ms_excel": "xls",
    "application/xls": "xls",
    "application/x-xls": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-excel": "xlsx",
    "application/xml": "xml",
    "text/xml": "xml",
    "text/xsl": "xsl",
    "application/xspf+xml": "xspf",
    "application/x-compress": "z",
    "application/x-zip": "zip",
    "application/zip": "zip",
    "application/x-zip-compressed": "zip",
    "application/s-compressed": "zip",
    "multipart/x-zip": "zip",
    "text/x-scriptzsh": "zsh",
  };
  return !_.isEmpty(mime_map[mime]) ? mime_map[mime] : false;
}

module.exports = {
  uploadImg,
};
