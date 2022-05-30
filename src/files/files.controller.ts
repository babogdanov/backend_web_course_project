import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  //TODO: look if we can't validate with these interceptors
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return JSON.stringify({ message: 'good' });
  }

  //TODO: Find how to convert files.
  @Post('uploadAndReturn')
  @UseInterceptors(AnyFilesInterceptor())
  uploadAndReturnFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Response({ passthrough: true }) res,
  ) {
    const file = createReadStream(join(process.cwd(), 'package.json'));

    /*   res.set({
      'Content-Type': 'form-data',
      'Content-Disposition': 'attachment; filename="package.json"',
    }); */
    return new StreamableFile(file);
  }
}
