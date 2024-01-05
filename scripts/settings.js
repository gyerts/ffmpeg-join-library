const {join} = require("path");

class Settings {
    OUT_FOLDER = '';
    mainVideoName = '';

    constructor(OUT_FOLDER) {
        this.OUT_FOLDER = OUT_FOLDER;
        this.mainVideoName = join(this.OUT_FOLDER, 'output.mp4')
    }

    setMainVideoName(name) {
        this.mainVideoName = join(this.OUT_FOLDER, slugifyFile(name));
    }
}

const slugifyFile = (str) => {
    console.log('[slugify] name before: ', decodeURI(str));

    let newName = decodeURI(str);
    const extension = str.split('.').pop();

    if (extension) {
        newName = newName.replace(extension, '');
    }

    newName = transliterate(newName)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    newName = `${newName}.${extension}`;

    console.log('[slugify] name after: ', newName);

    return newName;
};

const slugify = (str) => {
    console.log('[slugify] name before: ', str);

    const name = transliterate(str)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    console.log('[slugify] name after: ', name);

    return name;
};

function transliterate(word) {
    let answer = '';
    const a = {};

    a['Ё'] = 'YO';
    a['Й'] = 'I';
    a['Ц'] = 'TS';
    a['У'] = 'U';
    a['К'] = 'K';
    a['Е'] = 'E';
    a['Н'] = 'N';
    a['Г'] = 'G';
    a['Ш'] = 'SH';
    a['Щ'] = 'SCH';
    a['З'] = 'Z';
    a['Х'] = 'H';
    a['Ъ'] = "'";
    a['ё'] = 'yo';
    a['й'] = 'i';
    a['ц'] = 'ts';
    a['у'] = 'u';
    a['к'] = 'k';
    a['е'] = 'e';
    a['н'] = 'n';
    a['г'] = 'g';
    a['ш'] = 'sh';
    a['щ'] = 'sch';
    a['з'] = 'z';
    a['х'] = 'h';
    a['ъ'] = "'";
    a['Ф'] = 'F';
    a['Ы'] = 'I';
    a['В'] = 'V';
    a['А'] = 'А';
    a['П'] = 'P';
    a['Р'] = 'R';
    a['О'] = 'O';
    a['Л'] = 'L';
    a['Д'] = 'D';
    a['Ж'] = 'ZH';
    a['Э'] = 'E';
    a['ф'] = 'f';
    a['ы'] = 'i';
    a['в'] = 'v';
    a['а'] = 'a';
    a['п'] = 'p';
    a['р'] = 'r';
    a['о'] = 'o';
    a['л'] = 'l';
    a['д'] = 'd';
    a['ж'] = 'zh';
    a['э'] = 'e';
    a['Я'] = 'Ya';
    a['Ч'] = 'CH';
    a['С'] = 'S';
    a['М'] = 'M';
    a['И'] = 'I';
    a['Т'] = 'T';
    a['Ь'] = "'";
    a['Б'] = 'B';
    a['Ю'] = 'YU';
    a['я'] = 'ya';
    a['ч'] = 'ch';
    a['с'] = 's';
    a['м'] = 'm';
    a['и'] = 'i';
    a['т'] = 't';
    a['ь'] = "'";
    a['б'] = 'b';
    a['ю'] = 'yu';

    for (const i in word) {
        if (word.hasOwnProperty(i)) {
            if (a[word[i]] === undefined) {
                answer += word[i];
            } else {
                answer += a[word[i]];
            }
        }
    }
    return answer;
}

exports.Settings = Settings;
