import { Injectable } from '@nestjs/common';
import * as CSV from 'csvtojson';
import { Readable } from 'stream';

@Injectable()
export class FilesService {
  parse<TEntity>(file: Express.Multer.File) {
    const { originalname, buffer } = file;
    console.log(originalname);
    const extension = originalname.slice(originalname.lastIndexOf('.'));

    switch (extension) {
      case '.csv':
        return this.parseCSV(buffer);
      // `.xlsx` files are still not supported.
      case '.xlsx':
      default:
        throw new Error(`${extension} files are not supported!`);
    }
  }

  private async parseCSV<TEntity>(buffer: Buffer) {
    const stream = Readable.from(buffer);
    const csvAsJSON = await CSV({
      checkType: true,
      ignoreEmpty: true,
      checkColumn: true,
    }).fromStream(stream);
    return csvAsJSON;
  }
}
