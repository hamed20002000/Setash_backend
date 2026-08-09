import { ChannelRows } from "src/domain/entities/ChannelRows";
import { UpdateChannelRowDto } from "../dtos/initial-operations/network-dto";
import { Users } from "src/domain/entities/Users";
import { Works } from "src/domain/entities/Works";
import { NetworkTrAdis } from "src/domain/entities/NetworkTrAdis";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { ChannelRowItems } from "src/domain/entities/ChannelRowItems";
import { EntityManager } from "typeorm";

export function mapChannelRowDtosToEntities(
  dtos: UpdateChannelRowDto[],
  parent: ChannelRows | null,
  user: Users,
  work: Works,
  networkTrAdi: NetworkTrAdis
): ChannelRows[] {
  return dtos.map(dto => {
    const row = new ChannelRows();
    row.title = dto.title;
    row.label = dto.label;
    row.productStatus = dto.productStatus;
    row.productType = dto.productTypeId ? { id: dto.productTypeId } as any : null;
    row.recordStatus = recordStatus.Active;
    row.createAt = new Date();
    row.user = user;
    row.workhouse = work;
    row.networkTrAdi = networkTrAdi;
    row.parent = parent;

    row.channelRowItems = (dto.channelRowItems || []).map(itemDto => {
      const item = new ChannelRowItems();
      item.value = itemDto.value;
      item.createAt = new Date();
      item.recordStatus = recordStatus.Active;
      item.item = { id: itemDto.itemId } as any;
      item.user = user;
      item.channelRow = row;
      return item;
    });

    row.channelRows = dto.childChannelRows
      ? mapChannelRowDtosToEntities(dto.childChannelRows, row, user, work, networkTrAdi)
      : [];

    return row;
  });
}
export function flattenChannelRows(rows: ChannelRows[]): ChannelRows[] {
  const result: ChannelRows[] = [];

  function traverse(row: ChannelRows) {
    result.push(row);
    if (row.channelRows?.length) {
      row.channelRows.forEach(traverse);
    }
  }

  rows.forEach(traverse);
  return result;
}

export async function saveTreeChannelRows(
  rows: ChannelRows[],
  manager: EntityManager
): Promise<void> {
  for (const row of rows) {
    // اول parent رو ذخیره می‌کنیم
    await manager.getRepository(ChannelRows).save(row);

    // سپس آیتم‌های مربوطه
    if (row.channelRowItems?.length > 0) {
      await manager.getRepository(ChannelRowItems).save(row.channelRowItems);
    }

    // سپس بچه‌ها (childChannelRows) به صورت بازگشتی
    if (row.channelRows?.length > 0) {
      await saveTreeChannelRows(row.channelRows, manager);
    }
  }
}

