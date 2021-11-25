import http from "../http_common/HTTPCommon";

class UploadService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getGifFiles() {
    return http.get("/files/gif");
  }

  getMp3Files() {
    return http.get("/files/mp3");
  }
}

export default new UploadService();