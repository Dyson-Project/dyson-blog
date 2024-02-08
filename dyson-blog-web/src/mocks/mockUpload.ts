import {FileToUpload, readFile} from '@draft-js-plugins/drag-n-drop-upload';
import {FileData} from "@draft-js-plugins/drag-n-drop-upload/lib/handleDroppedFiles";
import {FileResult} from "@draft-js-plugins/drag-n-drop-upload/lib/utils/file";

type SuccessFunction = (uploadedFiles: Array<FileToUpload>) => void;
type FailFunction = (file: FileToUpload) => void;
type ProgressFunction = (percent: number, file: FileToUpload) => void;
/*
*
* @name: mockUpload
* @desc: Custom file upload function. Simulates a file upload.
* @param {[File], formData} data: consists of an array of files that have been uploaded and a formData object composed of those same files.
* @param {function([{name: string, src: string}])} success - function to mark a successfull file upload, it takes an array of successfully uploaded files.
* @param {function({name: string, src?: string})} failed - function that is called to mark a failure to upload one or more files. Removes the upload placeholders.
* @param {(function(percent:int, file: {name:string, src:string})} progress - function to mark the progress in percentage points. It updates the progress count on each placeholder.
*/
export default function mockUpload(data: FileData,
                                   success: SuccessFunction,
                                   failed: FailFunction,
                                   progress: ProgressFunction) {
    function doProgress(percent: number) {
        console.log(data, progress)
        // progress(percent, file);
        if (percent === 100) {
            // Start reading the file
            Promise.all(data.files.map(readFile)).then((files: FileResult[]) =>
                files.map<FileToUpload>((f: FileResult) => {
                    return <FileToUpload>{src: f.src, name: f.name};
                })
            ).then((files: FileToUpload[]) =>
                success(files)
            );
        } else {
            setTimeout(doProgress, 250, (percent || 0) + 10);
        }
    }

    doProgress(0);
}