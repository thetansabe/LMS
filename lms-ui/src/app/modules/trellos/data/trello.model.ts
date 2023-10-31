export interface Coordinate {
  screenX: number;
  screenY: number;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  tags: string[];
  topLeftCoor: Coordinate;
  bottomRightCoor: Coordinate;
  width: number;
  height: number;
}

export interface Column {
  id: string;
  title: string;
  tickets: Ticket[];
}
