import { VeritasService } from '@discover/models/veritas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  constructor(private prisma: VeritasService) {}

  private treatedName(name: string) {
    return name.replace(' ', '-').toLocaleLowerCase();
  }

  async findOne(typedName: string) {
    const treatedName = this.treatedName(typedName);

    let tag = await this.prisma.tag.findUnique({
      where: { name: treatedName },
    });

    if (!tag) {
      tag = await this.create(treatedName);
    }

    return { typedName, tag };
  }

  async create(name: string) {
    const tag = await this.prisma.tag.create({ data: { name: name } });

    return tag;
  }
}
