import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface SlideToggle {
    name: string,
    classes: string,
    value: string,
    label: string
  }

export async function generateSt(options: any): Promise<void> {
    try {
        const payload: SlideToggle = {
            name: options.name || 'dead-slide-toggle',
            classes: options.classes || "m-1rem",
            value: options.value || "booleanData",
            label: options.label || "True/False?"
        };

        const response = await axios.post(
            ENDPOINTS.slideToggle,
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

