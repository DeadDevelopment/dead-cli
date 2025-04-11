import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface themeChange {
    name: string,
    defaultThemeName: string
}

export async function generateThC(options: any): Promise<void> {
    try {
        const payload: themeChange = {
            name: options.name || 'dead-theme-changer',
            defaultThemeName: options.defaultThemeName || "dead-theme"
        };

        const response = await axios.post(
            ENDPOINTS.themeChanger,
            payload
        );

        if (response.data.success && response.data.result) {
            
            const baseName = options.name;
            const result: GenerationResult = { ...response.data.result };
      
            // Define filename templates. You can customize these as needed.
            const filenameMap = {
                ts: '{name}.service.ts',
                spec: '{name}.service.spec.ts'
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

