import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface RadioButton {
    name: string,
    radioGroup: {
      alabel: string,
      classes: string,
      ngModel: string
    },
    buttons: {
      label: string,
      classes: string,
      value: string
    }[]
  }

  export async function generateRb(options: any): Promise<void> {
    try {
        const payload: RadioButton = {
            name: options.name || 'dead-redio-button',
            radioGroup: options.radioGroup || {alabel: "aria label", classes: "m-1rem pri-dark", ngModel: "result"},
            buttons: options.buttons || [
                {classes: "pri-lite-bg small-text", label: "radio 1", value: "readio1"},
                {classes: "pri-lite-bg small-text", label: "radio 2", value: "readio2"}
            ]
        };

        const response = await axios.post(
            ENDPOINTS.radioButton,
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