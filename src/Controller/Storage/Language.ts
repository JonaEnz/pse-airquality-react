export default class Language {

  static getText(id: string): string {
    //TODO: Implement real method
    return id;
  }

  static getSelectedLanguage(): string {
    return "Deutsch";
  }

  static changeLanguage(language: string): void {

  }

  static getAvailabeleLanguages(): string[] {
    return ['Deutsch', 'English', 'Espanol'];
  }
}
