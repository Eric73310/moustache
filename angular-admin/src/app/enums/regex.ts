export enum RegexEnum {
    NAME = '^(?!\\s)([a-zA-Z-/\' çàèéùâêîôûäëïöü]){2,48}(?<!\\s)$',
    PASSWORD = '^(?=\\S.*[a-zçàâäéèêëîïôöùûüÿ])(?=.*[A-ZÇÀÂÄÉÈÊËÎÏÔÖÙÛÜŸ])(?=.*\\d)(?=.*[!@#$%&*()\\-_=+<>/|?.,;^¨])[A-Za-zçàâäéèêëîïôöùûüÿÇÀÂÄÉÈÊËÎÏÔÖÙÛÜŸ\\d!@#$%&*()\\-_=+<>/|?.,;^¨]{6,50}$'
}
