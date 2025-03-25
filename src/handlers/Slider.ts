import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Slider {
    name: string,
    slider: {
        classes: string,
        min: string,
        max: string,
        step: string,
        showTicks: string,
        discrete: string,
        disabled: string
    },
    inputs: {
        classes: string,
        ngModel: string,
        thumbLabel: string,
        value: string
    }[]
}

export async function generateslider(options: any): Promise<void> {
    try {
        const payload: Slider = {
            name: options.name || 'dead-slider',
            slider: options.slider || {
                "classes": "m-1rem",
                "min": "0",
                "max": "100",
                "step": "step",
                "disabled": "!disabled",
                "discrete": "discrete",
                "showTicks": "false" 
            },
            inputs: options.inputs ? JSON.parse(options.inputs) : [
                {
                    "ngModel": "inputs.value",
                    "classes": "pri-dark pri-lite-bg",
                    "thumbLabel": "matSliderThumb",
                    "value": "20"
                },
            ]
        };

        const response = await axios.post(
            ENDPOINTS.slider,
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