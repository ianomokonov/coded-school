export const fileFormat = (fileName: string): string => {
    const splitName = fileName.split('.');
    const len = splitName.length;
    const format: string = splitName[len - 1];
    switch (len) {
        default:
        case 2: {
            if (splitName[0] === '') {
                return Format.txt;
            }
            for (const enumKey in Format) {
                if (format === enumKey) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    return Format[format];
                }
            }
            return '';
        }
        case 1: {
            return Format.txt;
        }
    }
};

enum Format {
    html = 'html',
    ts = 'typescript',
    js = 'javascript',
    json = 'json',
    md = 'markdown',
    txt = 'txt',
    css = 'css',
}
