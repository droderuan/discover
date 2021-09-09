import { MeetTag, Tag, VeritasService } from '@discover/models-veritas';
import { Injectable, Logger } from '@nestjs/common';
import { CreateTagDTO } from '../dto/createTag.dto';

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

  async getTagDiff(
    meetId: number,
    tagsToUse: CreateTagDTO[],
    meetTags: {
      Tag: Tag;
      typedName: string;
    }[]
  ) {
    const treatedTagsName = tagsToUse.map(({ name }) => ({
      name: this.treatedName(name),
    }));

    const tagDiffToSave = treatedTagsName.filter(
      ({ name }) => !meetTags.some(({ Tag }) => name === Tag.name)
    );

    const tagDiffToDelete = meetTags.filter(
      ({ Tag }) => !treatedTagsName.some(({ name }) => name === Tag.name)
    );

    const tagsToDelete = tagDiffToDelete.reduce(
      (list, tag) => ({
        ids: [...list.ids, tag.Tag.id],
        typedNames: [...list.typedNames, tag.typedName],
      }),
      { ids: [], typedNames: [] }
    );

    if (tagsToDelete.typedNames.length > 0) {
      await this.prisma.meetTag.deleteMany({
        where: {
          AND: {
            meetId,
            Tag: {
              id: {
                in: tagsToDelete.ids,
              },
            },
            typedName: {
              in: tagsToDelete.typedNames,
            },
          },
        },
      });
    }

    return tagDiffToSave;
  }
}
