import { VeritasService } from '@discover/models-veritas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  constructor(private prisma: VeritasService) {}

  async create(name: string) {
    const treatedName = name.replace(' ', '-').toLocaleLowerCase();

    const tag = await this.prisma.tag.create({ data: { name: treatedName } });

    return { name, tag };
  }
}
