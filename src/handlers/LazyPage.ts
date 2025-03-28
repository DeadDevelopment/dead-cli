import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface LazyPage {
    name: string,
    routes: {
        path: string,
        outlet: string,
        component: string,
        mName: string
    }[],
    outlets: {
        divClasses: string,
        divId: string,
        oClasses: string,
        name: string
    }[]
}

export async function generateLp(options: any): Promise<void> {
    try {
        const payload: LazyPage = {
            name: options.name || 'dead-lazy-page',
            routes: options.routes || [
                {
                    "component": "./component-one.component",
                    "mName": "ComponentOne",
                    "outlet": "yo-outlet",
                    "path": "routepath"
                },
                {
                    "component": "./component-two.component",
                    "mName": "ComponentTwo",
                    "outlet": "yo-outlet-again",
                    "path": "routepathtwo"
                }
            ],
            outlets: options.outlets || [
                {
                    "divClasses": "m-1rem",
                    "divId": "outlet-id",
                    "name": "yo-outlet",
                    "oClasses": "m-1rem"
                },
                {
                    "divClasses": "m-1rem",
                    "divId": "outlet-id-1",
                    "name": "yo-outlet-again",
                    "oClasses": "m-1rem"
                }
            ]
        };

        const response = await axios.post(
            ENDPOINTS.lazyPage,
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
                router: '{name}.routes.ts',
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
    }  catch (error: any) {
        console.error('Error:', error.message);
    }
}
