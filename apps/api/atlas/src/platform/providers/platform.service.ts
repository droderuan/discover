import { VeritasService } from '@discover/models-veritas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformService {
  constructor(private prisma: VeritasService) {}

  async exist(data: number | number[]) {
    if (Array.isArray(data)) {
      const platforms = await this.prisma.platform.findMany({
        where: {
          id: {
            in: data,
          },
        },
      });

      return platforms.length === data.length;
    }

    const platform = await this.prisma.platform.findUnique({
      where: {
        id: data,
      },
    });

    return !!platform;
  }
}
