import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface ImageDiv {
    name: string,
    imgSrc: string,
    imgAlt: string,
    classes: string
}

export async function generateId(options: any): Promise<void> {
    try{
        const payload: ImageDiv = {
            name: options.name || 'dead-image-div',
            imgSrc: options.imgSrc || 'https://firebasestorage.googleapis.com/v0/b/deaddevelopment-95591.appspot.com/o/dead_skull.PNG?alt=media&token=1634c2ba-f3e8-49db-bfd6-0b49576cba4a',
            imgAlt: options.imgAlt || 'Dead Development Logo',
            classes: options.classes || ''
        };

        const response = await axios.post(
            ENDPOINTS.imageDiv,
            payload
        );

        if (response.data.success && response.data.result) {

            const baseName = options.name;
            const result: GenerationResult = { ...response.data.result };
      
            if (!result.scss) {
                result.scss = ''; // create an empty SCSS file
            }
      
            // Define filename templates. You can customize these as needed.
            const filenameMap = {
                html: '{name}.component.html',
                ts: '{name}.component.ts',
                scss: '{name}.component.scss'
            };
      
            await writeGeneratedFiles({
                outputDir: './', // or use an option to let the user specify the directory
                baseName,
                result,
                filenameMap
            });
            
            console.log(MSGS.SUCCESS);
          } else {
            console.error(ERRORS.HANDLER_TRY);
          }
    } catch (error: any) {
        console.error('Error:', error.message);
    }
}