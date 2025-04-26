import axios from 'axios';
import { ERRORS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles } from '../utils/gWriter';

export async function gHandler(options: string) {
  const start = Date.now(); // Start timing

  try {
    const response = await axios.post(ENDPOINTS.g, { raw: options });

    if (response.data.success) {
      if (response.data.writeInstructions) {
        // Backend sends ready-to-use writeInstructions
        const writeInstructions = response.data.writeInstructions;
        
        await writeGeneratedFiles(writeInstructions);
        const end = Date.now(); // <--- End timing
        console.log(`⏱️  Command completed in ${(end - start) / 1000} seconds`);
      } else if (response.data.help) {
        // Help output (for --help style commands)
        console.log(response.data.help);
        
      } else {
        console.error(ERRORS.HANDLER_TRY);
      }
      
    } else {
      console.error(ERRORS.HANDLER_TRY);
    }
    
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}


// export async function gHandler(options: string) {
//     try {
//         const response = await axios.post(ENDPOINTS.g, { raw: options });
    
//         if (response.data.success) {
//           if (response.data.result) {
//             const result: GenerationResult = { ...response.data.result };
    
//             // Smart fallback for base name
//             const baseName =
//               result.ts?.match(/class (\w+)/)?.[1]
//                 ?.replace("Component", "")
//                 ?.replace(/([A-Z])/g, "-$1")
//                 .toLowerCase()
//                 .replace(/^-/, "") || "dead-component";
    
//             const filenameMap = {
//               html: '{name}.component.html',
//               scss: '{name}.component.scss',
//               spec: '{name}.component.spec.ts',
//               ts: '{name}.component.ts'
//             };
    
//             await writeGeneratedFiles({
//               outputDir: './',
//               baseName,
//               result,
//               filenameMap
//             });
    
//             console.log(MSGS.SUCCESS);
//           } else if (response.data.help) {
//             // 🆕 Handle --help response from cloud
//             console.log(response.data.help);
//           } else {
//             console.error(ERRORS.HANDLER_TRY);
//           }
//         } else {
//           console.error(ERRORS.HANDLER_TRY);
//         }
//       } catch (error: any) {
//         console.error('Error:', error.message);
//       }
// }
