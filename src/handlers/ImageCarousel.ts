import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface ImageCarousel {
    name: string,
    cClasses: string,
    w: {
         classes: string,
         s: string
    },
    imgs: {
         alt: string,
         src: string,
         classes: string
    }[],
    controls: {
        btype: string,
        classes: string,
        bclasses: string,
    },
    pIcon: {
        ariaLabel: string,
        fontIcon: string,
        classes: string
    }
    nIcon: {
        ariaLabel: string,
        fontIcon: string,
        classes: string
    }
}

export async function generateIc(options: any): Promise<void> {
    try {
        const payload: ImageCarousel = {
            name: options.name || 'dead-image-carousel',
            cClasses: options.cClasses || "container",
            w: options.w || {classes: "m-1rem", s: "100"},
            imgs: options.imgs || [
                {
                    alt: "image 1",
                    src: "https://firebasestorage.googleapis.com/v0/b/deaddevelopment-95591.appspot.com/o/dead_skull.PNG?alt=media&token=1634c2ba-f3e8-49db-bfd6-0b49576cba4a",
                    classes: "m-1rem skull-logo" 
                },
                {
                    alt: "image 2",
                    src: "https://firebasestorage.googleapis.com/v0/b/deaddevelopment-95591.appspot.com/o/dead_skull.PNG?alt=media&token=1634c2ba-f3e8-49db-bfd6-0b49576cba4a",
                    classes: "m-1rem skull-logo"
                }
            ],
            controls: options.controls || {bclasses: "m-0-5rem", btype: "mat-mini-fab", classes: "m-1rem controls"},
            pIcon: options.pIcon || {ariaLabel: "Previous image chevron.", fontIcon: "chevron_left", classes: "previous"},
            nIcon: options.nIcon || {ariaLabel: "Next image chevron.", fontIcon: "chevron_right", classes: "next"}
        };

        const response = await axios.post(
            ENDPOINTS.imageCarousel,
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
    }  catch (error: any) {
        console.error('Error:', error.message);
    }
}
