import { VeritasService } from '@discover/models-veritas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MeetService {
  constructor(private prisma: VeritasService) { }

}
