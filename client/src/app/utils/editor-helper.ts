import { dataURItoBlob } from './data-to-blob';

export class EditorHelper {
    static getFilesDelta(
        newContent: string,
        nameFormatter: (index: number, extension: string) => string,
        initContent?: string,
    ): [string[], File[], string] {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = newContent;

        const prevWrapper = document.createElement('div');
        let prevFiles: string[] = [];
        if (initContent) {
            prevWrapper.innerHTML = initContent;
            prevFiles = Array.from(prevWrapper.querySelectorAll('img')).map(
                (el) => el.getAttribute('src') as string,
            );
        }

        const newFiles: File[] = [];
        wrapper.querySelectorAll('img').forEach((el, index) => {
            const src = el.getAttribute('src');
            if (!src) {
                return;
            }
            if (src?.includes('data:image')) {
                const blob = dataURItoBlob(src);
                const [, ext] = blob.type.split('/');
                newFiles.push(new File([blob], nameFormatter(index, ext)));
                el.setAttribute('src', index.toString());
                return;
            }
            prevFiles = prevFiles?.filter((p) => p !== src);
        });

        return [prevFiles, newFiles, wrapper.innerHTML];
    }
}
