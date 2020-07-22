import * as languageData from "./languages.json";

interface Lang {
  id: string;
  name: string;
  strings: Strings;
}

interface Strings {
  [id: string]: string;
}

export default class Language {
  private static languageInstance: Language;

  private selectedLangId: string;
  private languages: Lang[];
  private selectedLang: Lang;

  //class Langunage is designed as a singleton. You can get access to the only instance via the getInstance method
  constructor() {
    this.selectedLangId = "de-de";
    this.languages = languageData.languages;
    this.selectedLang = this.languages[0];
  }

  //returns the language instance
  public static getInstance(): Language {
    if (!this.languageInstance) {
      this.languageInstance = new Language();
      var local = localStorage.getItem("language");
      if (local) {
        //Change language if selected
        this.languageInstance.changeLanguage(local);
      }
    }
    return this.languageInstance;
  }

  //returns the string that corresponds to the string id in the currently selected language
  public getText(id: string): string {
    let text: string = this.selectedLang.strings[id];
    if (text === "" || text == null) {
      alert(
        "There is no string with id: " +
        id +
        " in " +
        this.selectedLang.name +
        "."
      );
      return "STRING MISSING";
    }
    return text;
  }

  public getSelectedLanguage(): string {
    return this.selectedLang.name;
  }

  public getSelectedLanguageId(): string {
    return this.selectedLang.id;
  }

  public changeLanguage(languageID: string): void {
    let find: Lang | undefined = this.languages.find(
      (e) => e.id === languageID
    );
    if (find !== undefined) {
      this.selectedLang = find;
      this.selectedLangId = languageID;
      localStorage.setItem("language", this.selectedLangId);
    }
  }

  public getAvailabeleLanguages(): Map<string, string> {
    let langs: Map<string, string> = new Map<string, string>();
    this.languages.forEach((element) => {
      langs.set(element.id, element.name);
    });
    return langs;
  }
}
