import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column, Ticket } from './data/trello.model';
import { board } from './data/trello.data';

export interface DraggingState {
  ticket: Ticket;
  previousColumnId: string;
  destinateColumnId: string;
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

  draggingState: DraggingState = {
    ticket: null!,
    previousColumnId: null!,
    destinateColumnId: null!,
  };

  drop(event: any, destinateColId: string) {
    this.draggingState = {
      ...this.draggingState,
      destinateColumnId: destinateColId,
    };

    const closestTicketId = this.getClosestTicketId(event.clientX, event.clientY, this.draggingState.ticket.id);
    this.transferArrayItem(closestTicketId);
  }

  drag(event: any, draggingTicket: Ticket, columnId: string) {
    this.draggingState = {
      ...this.draggingState,
      ticket: draggingTicket,
      previousColumnId: columnId
    };
  }

  onDragging(event: any) {
    event.preventDefault(); //by default, there is a cannot drag icon
  }

  // collision detection: mouse pointer v/s box center
  getClosestTicketId(pointerX: number, pointerY: number, draggingTicketId: string){
    const draggableDom = document.querySelectorAll('li[draggable="true"]');
    const draggableDomList = Array.from(draggableDom).filter((dom: Element) =>  dom.id !== draggingTicketId );
    
    const closest = draggableDomList.reduce((prev: any, curr: any) => {
      const box = curr.getBoundingClientRect();

      const offsetY = pointerY - box.top - box.height / 2;
      const offsetX = pointerX - box.left - box.width / 2;
      const offset = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));

      if (offset > 0 && offset < prev.offset) {
        return { offset: offset, destinationId: curr.id }
      } else {
        return prev
      }
    }, { offset: Number.POSITIVE_INFINITY, destinationId: '' });
    
    return closest.destinationId;
  }

  checkClosestTicketInsideDestinateColumn(closestTicketId: string = '') {
    const destinateColumn = board.filter((column) => column.id === this.draggingState.destinateColumnId);
    const destinateColumnTickets = destinateColumn[0]?.tickets;
    const idx = destinateColumnTickets.findIndex((ticket) => ticket.id === closestTicketId);
    return idx !== -1;
  }

  // this is not redundent variable
  // at line 105, closestTicketId is empty because of closure
  clsTkId = ''; 

  transferArrayItem(closestTicketId: string = '') {
    this.clsTkId = closestTicketId;
    
    board.forEach((column) => {
      //remove ticket from old column
      if (column.id === this.draggingState.previousColumnId) {
        column.tickets = column.tickets.filter(
          (ticket) => ticket.id !== this.draggingState.ticket.id
        );
      }

      if (this.checkClosestTicketInsideDestinateColumn(closestTicketId) === false) {
        //add ticket to new column
        if (column.id === this.draggingState.destinateColumnId) {
          column.tickets.push(this.draggingState.ticket);
        }
        return;
      }
      
      //append ticket to position right before the closest ticket
      const idx = column.tickets.findIndex((ticket) => {
        return ticket.id === this.clsTkId;
      });
      
      if (idx === -1) return;

      // insert into array
      column.tickets.splice(idx + 1, 0, this.draggingState.ticket);
    });
  }
  
}
