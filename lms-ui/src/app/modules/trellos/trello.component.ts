import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column, Coordinate, Ticket } from './data/trello.model';
import { board } from './data/trello.data';

export interface DraggingState {
  ticket: Ticket;
  previousColumnId: string;
  destinateColumnId: string;
  topLeftCoor: Coordinate;
  bottomRightCoor: Coordinate;
}

@Component({
  selector: 'app-trello',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.scss'],
})
export class TrelloComponent {
  board: Column[] = board;

  ngAfterViewInit() {
    this.updateTicketCoor();
  }

  ngAfterViewChecked() {
    this.updateTicketCoor();
  }

  updateTicketCoor() {
    board.forEach((column: Column) => {
      column.tickets.forEach((ticket: Ticket) => {
        const ticketElement = document.getElementById(ticket.id);
        // console.log(ticketElement);

        if (!ticketElement) return;

        const rect = ticketElement.getBoundingClientRect();

        const topLeftCoor = {
          screenX: rect?.x,
          screenY: rect?.y,
        };

        const bottomRightCoor = {
          screenX: rect?.x + rect?.width,
          screenY: rect?.y + rect?.height,
        };

        ticket.topLeftCoor = topLeftCoor;
        ticket.bottomRightCoor = bottomRightCoor;
        ticket.width = rect?.width;
        ticket.height = rect?.height;
      });
    });
  }

  draggingState: DraggingState = {
    ticket: null!,
    previousColumnId: null!,
    destinateColumnId: null!,
    topLeftCoor: {
      screenX: -1,
      screenY: -1,
    },
    bottomRightCoor: {
      screenX: -1,
      screenY: -1,
    },
  };
  getTickets(columnId: string = 'col-1') {
    const col = this.board.filter((column) => column.id === columnId);
    return col[0]?.tickets;
  }

  drop(event: any, destinateColId: string) {
    console.log('drop event: ', event);

    const dropPosition: Coordinate = {
      screenX: event.screenX,
      screenY: event.screenY,
    };

    this.getNearestTicket(dropPosition);

    this.draggingState = {
      ...this.draggingState,
      destinateColumnId: destinateColId,
      topLeftCoor: {
        screenX: event.screenX,
        screenY: event.screenY,
      },
      bottomRightCoor: {
        screenX: event.screenX + this.draggingState.ticket.width,
        screenY: event.screenY + this.draggingState.ticket.height,
      },
    };

    // update board
    this.transferArrayItem();

    // reset closest ticket
    this.closestTicket = null!;
  }

  drag(event: any, draggingTicket: Ticket, columnId: string) {
    this.draggingState = {
      ...this.draggingState,
      ticket: draggingTicket,
      previousColumnId: columnId,
      topLeftCoor: draggingTicket.topLeftCoor,
      bottomRightCoor: draggingTicket.bottomRightCoor,
    };
  }

  onDragging(event: any) {
    event.preventDefault();
    console.log('onDragging event: ', event);
    // this.getNearestTickets();
    this.draggingState = {
      ...this.draggingState,
      topLeftCoor: {
        screenX: event.screenX,
        screenY: event.screenY,
      },
      bottomRightCoor: {
        screenX: event.screenX + this.draggingState.ticket.width,
        screenY: event.screenY + this.draggingState.ticket.height,
      },
    };
  }

  moveItemInArray() {
    if (!this.closestTicket) {
      this.transferArrayItem();
      return;
    }

    board.forEach((column) => {
      //remove ticket from old column
      if (column.id === this.draggingState.previousColumnId) {
        column.tickets = column.tickets.filter(
          (ticket) => ticket.id !== this.draggingState.ticket.id
        );
      }

      //append ticket to position right before the closest ticket
      const idx = column.tickets.findIndex((ticket) => {
        return ticket.id === this.closestTicket.id;
      });

      if (idx === -1) return;

      column.tickets.splice(idx, 0, this.draggingState.ticket);
    });
  }

  transferArrayItem() {
    board.forEach((column) => {
      //remove ticket from old column
      if (column.id === this.draggingState.previousColumnId) {
        column.tickets = column.tickets.filter(
          (ticket) => ticket.id !== this.draggingState.ticket.id
        );
      }

      if (!this.closestTicket) {
        //add ticket to new column + update tickets position
        if (column.id === this.draggingState.destinateColumnId) {
          column.tickets.push(this.draggingState.ticket);
        }
        return;
      }

      //append ticket to position right before the closest ticket
      const idx = column.tickets.findIndex((ticket) => {
        return ticket.id === this.closestTicket.id;
      });

      if (idx === -1) return;

      column.tickets.splice(idx, 0, this.draggingState.ticket);
    });
  }

  closestTicket: Ticket = null!;

  //collision detection: topLeft corner inside another div topLeft & bottomRight
  getNearestTicket(dropPosition: Coordinate) {
    board.forEach((column) => {
      if (this.closestTicket) return;

      column.tickets.forEach((ticket: Ticket) => {
        if (
          dropPosition.screenX > ticket.topLeftCoor.screenX &&
          dropPosition.screenY > ticket.topLeftCoor.screenY
        ) {
          if (
            dropPosition.screenX < ticket.bottomRightCoor.screenX &&
            dropPosition.screenY < ticket.bottomRightCoor.screenY
          ) {
            this.closestTicket = ticket;
            return;
          }
        }
      });
    });
  }
}
