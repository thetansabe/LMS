import { Column, Ticket } from './trello.model';

export const tickets1: Ticket[] = [
  {
    id: 'ticket-1',
    title: 'Task 1',
    description: 'This is a description',
    tags: ['tag1', 'tag2'],
    topLeftCoor: {
      screenX: -1,
      screenY: -1,
    },
    bottomRightCoor: {
      screenX: -1,
      screenY: -1,
    },
    width: -1,
    height: -1,
  },
  {
    id: 'ticket-2',
    title: 'Task 2',
    description: 'This is a description',
    tags: ['tag1', 'tag2'],
    topLeftCoor: {
      screenX: -1,
      screenY: -1,
    },
    bottomRightCoor: {
      screenX: -1,
      screenY: -1,
    },
    width: -1,
    height: -1,
  },
  {
    id: 'ticket-3',
    title: 'Task 3',
    description: 'This is a description',
    tags: ['tag1', 'tag2'],
    topLeftCoor: {
      screenX: -1,
      screenY: -1,
    },
    bottomRightCoor: {
      screenX: -1,
      screenY: -1,
    },
    width: -1,
    height: -1,
  },
];

export const tickets2: Ticket[] = [
  {
    id: 'ticket-4',
    title: 'Task 4',
    description: 'This is a description',
    tags: ['tag1', 'tag2'],
    topLeftCoor: {
      screenX: -1,
      screenY: -1,
    },
    bottomRightCoor: {
      screenX: -1,
      screenY: -1,
    },
    width: -1,
    height: -1,
  },
  {
    id: 'ticket-5',
    title: 'Task 5',
    description: 'This is a description',
    tags: ['tag1', 'tag2'],
    topLeftCoor: {
      screenX: -1,
      screenY: -1,
    },
    bottomRightCoor: {
      screenX: -1,
      screenY: -1,
    },
    width: -1,
    height: -1,
  },
];

export const tickets3: Ticket[] = [
  {
    id: 'ticket-6',
    title: 'Task 6',
    description: 'This is a description',
    tags: ['tag1', 'tag2'],
    topLeftCoor: {
      screenX: -1,
      screenY: -1,
    },
    bottomRightCoor: {
      screenX: -1,
      screenY: -1,
    },
    width: -1,
    height: -1,
  },
  {
    id: 'ticket-7',
    title: 'Task 7',
    description: 'This is a description',
    tags: ['tag1', 'tag2'],
    topLeftCoor: {
      screenX: -1,
      screenY: -1,
    },
    bottomRightCoor: {
      screenX: -1,
      screenY: -1,
    },
    width: -1,
    height: -1,
  },
];

export const board: Column[] = [
  {
    id: 'col-1',
    title: 'New Tasks',
    tickets: tickets1,
  },
  {
    id: 'col-2',
    title: 'In Progress',
    tickets: tickets2,
  },
  {
    id: 'col-3',
    title: 'Finished',
    tickets: tickets3,
  },
  {
    id: 'col-4',
    title: 'Abandoned',
    tickets: [],
  }
];
