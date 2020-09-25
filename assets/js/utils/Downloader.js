import { UrlProvider } from "./UrlProvider";

let a = document.createElement("a");
a.style.display = "none";

class Downloader {
  static downloadMp3(id, title, artist = "Twenty One Pilots") {
    a.href = UrlProvider.getUrlToMp3(id);
    a.download = `${artist} - ${title}.mp3`;
    a.type = "audio/mp3";
    a.click();
  }
}

export { Downloader };
