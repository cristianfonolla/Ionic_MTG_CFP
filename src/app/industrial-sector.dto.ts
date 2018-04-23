export class IndustrialSectorDto {

  id: number;
  groupName: string;
  industrialSectorName: string;
  description: string;

  constructor(id: number, groupName: string, industrialSectorName: string, description: string) {
    this.id = id;
    this.groupName = groupName;
    this.industrialSectorName = industrialSectorName;
    this.description = description;
  }
}
