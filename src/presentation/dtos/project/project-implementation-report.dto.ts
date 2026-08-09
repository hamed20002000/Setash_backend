import { ApiProperty } from '@nestjs/swagger';

export class ProjectImplementationReportDto {
  @ApiProperty({ example: 12 })
  ProjectId: number;

  @ApiProperty({ example: 'Pireviller TR-1' })
  ProjectName: string;

  @ApiProperty({ example: '2025-05-01T00:00:00.000Z' })
  StartDate: Date;

  @ApiProperty({ example: '2025-05-15T00:00:00.000Z' })
  EndDate: Date;

  @ApiProperty({ example: 5 })
  KaziYapilanDirekDurumu: number;

  @ApiProperty({ example: 3 })
  AltMontajiYapilan: number;

  @ApiProperty({ example: 2 })
  BetonAtilanDirekDurumu: number;

  @ApiProperty({ example: 1 })
  UstMontajiOrulenDirekDurumu: number;

  @ApiProperty({ example: 0 })
  UstMontajiKurulanDirekDurumu: number;

  @ApiProperty({ example: 4 })
  DikilenBetonDirekDurumu: number;

  @ApiProperty({ example: 7 })
  IletkenCekilenDirekDurumu: number;

  @ApiProperty({ example: 1 })
  AyiriciTakilanDirekDurumu: number;

  @ApiProperty({ example: 0 })
  DikilenAydinlatmaDirekDurumu: number;

  @ApiProperty({ example: 2 })
  KabloKanaliDurumu: number;

  @ApiProperty({ example: 1 })
  TransformatorDurumu: number;

  @ApiProperty({ example: 1 })
  DagitimPanosuDurumu: number;

  @ApiProperty({ example: 0 })
  SahaDagitimKutusuDurumu: number;

  @ApiProperty({ example: 1 })
  BetonKoskDurumu: number;

  @ApiProperty({ example: 1 })
  HucreDurumu: number;

  @ApiProperty({ example: 120 })
  CekilenKabloMiktari: number;
}
