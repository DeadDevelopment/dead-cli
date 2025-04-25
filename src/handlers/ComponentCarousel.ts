import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface cc {
    name: string,
    carousel: {
        classes: string,
        seconds: string
    },
    components: {
        fileName: string,
    }[],
    controls: {
        bType: string,
        classes: string
    }
    pIcon: {
        ariaLabel: string,
        fontIcon: string,
        classes: string
    },
    nIcon: {
        ariaLabel: string,
        fontIcon: string,
        classes: string
    }
}

export async function generateCCarousel(options: any): Promise<void> {
    try{
        
        const payload: cc = {
            name: options.name || 'dead-component-carousel',
            carousel: options.carousel || {"classes": "m-1rem", "seconds": "0.3"},
            components: options.components || [
                {"fileName": "COne"},
                {"fileName": "CTwo"},
                {"fileName": "CThree"}
            ],
            controls: options.controls || {"bType": "mat-flat-button", "classes": "button-text"},
            pIcon: options.pIcon || {"ariaLabel": "Icon name.", "fontIcon": "arrow_left", "classes": "pri m-1rem"},
            nIcon: options.nIcon || {"ariaLabel": "Icon name.", "fontIcon": "arrow_right", "classes": "pri m-1rem"}
        };

        const response = await axios.post(
            ENDPOINTS.componentCarousel,
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
                scss: '{name}.component.scss',
                spec: '{name}.component.spec.ts'
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
