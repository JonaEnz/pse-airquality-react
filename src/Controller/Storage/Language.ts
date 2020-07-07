import * as languageData from './languages.json';

interface Lang {
  id: string;
  name: string;
  strings: any;
}

export default class Language {

  private static languageInstance: Language;

  private selectedLangId: string;
  private languages: Lang[];
  private selectedLang: Lang;

  constructor() {
    this.selectedLangId = "de-de";
    this.languages = languageData.languages;
    this.selectedLang = this.languages[0];
  }

  public static getInstance(): Language {
    if (this.languageInstance == null) {
      this.languageInstance = new Language();
    }
    return this.languageInstance;
  }

  public getText(id: string): string {

    return id;
  }

  public getSelectedLanguage(): string {
    return this.selectedLang.name;
  }

  public changeLanguage(languageID: string): void {
    let find: Lang | undefined = this.languages.find((e) => e.id == languageID);
    if (find != undefined) {
      this.selectedLang = find;
    }
  }

  public getAvailabeleLanguages(): Map<string, string> {
    let langs: Map<string, string> = new Map<string, string>();
    this.languages.forEach(element => {
      langs.set(element.id, element.name);
    });
    return langs;
  }
}
