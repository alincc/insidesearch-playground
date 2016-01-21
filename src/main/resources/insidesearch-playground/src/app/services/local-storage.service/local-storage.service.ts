import {Injectable} from 'angular2/core';

export class Settings {
  constructor(
    public endpoint: string
  ) {  }
}

@Injectable()
export class LocalStorageService {

  constructor() {}

  loadSettings(): Settings {
      let endpoint = localStorage.getItem("settings.endpoint");
      return new Settings(endpoint);
  }

  saveSettings(settings: Settings): void {
      localStorage.setItem("settings.endpoint", settings.endpoint);
  }

}
