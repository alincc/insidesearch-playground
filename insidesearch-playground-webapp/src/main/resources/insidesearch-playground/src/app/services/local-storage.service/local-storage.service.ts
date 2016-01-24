import {Injectable} from 'angular2/core';

export class Settings {
    endpoints = [
        '',
        'http://escastest1.nb.no:8090/searchv2/search',
        'http://localhost:8765/v1/catalog/items'
        ];

  constructor(
    public endpoint: string
  ) {  }
}

@Injectable()
export class LocalStorageService {

    constructor() {}

    loadSettings(): Settings {
        let endpoint = localStorage.getItem("settings.endpoint");
        let settings = new Settings(endpoint)
        if (!settings.endpoint) {
            settings.endpoint = settings.endpoints[1];
        }

        return settings;
    }

    saveSettings(settings: Settings): void {
        localStorage.setItem("settings.endpoint", settings.endpoint);
    }

}
