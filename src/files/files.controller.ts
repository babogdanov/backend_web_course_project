import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DATA_IMPORT_FILE_NAME } from './file.utils';
import { multerOptions } from './files.multer-options';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  //TODO: look if we can't validate with these interceptors
  @UseInterceptors(FileInterceptor(DATA_IMPORT_FILE_NAME, multerOptions))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return JSON.stringify({ message: 'good' });
  }

  @Post('csvToJson')
  @UseInterceptors(FileInterceptor('file'))
  async importFile(@UploadedFile() file: Express.Multer.File) {
    const json = await this.filesService.parse<any>(file);
    return json;
  }
}
