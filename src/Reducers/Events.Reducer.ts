import { eventsCollection } from '../Firebase/firebase';

import { EventR51, EventId, EventToCFS } from '../Types/';

export type Event = EventR51;
export type Events = null | Event[];
export type EventActionType =
  | 'EMPTY'
  | 'ADDED'
  | 'MODIFIED'
  | 'REMOVED'
  | 'ADD'
  | 'MODIFY'
  | 'REMOVE';
export type EventAction =
  | { type: 'EMPTY' }
  | { type: 'ADDED', event: Event }
  | { type: 'MODIFIED', event: Event }
  | { type: 'REMOVED', event: Event }
  | { type: 'ADD', event: EventToCFS }
  | { type: 'MODIFY', event: EventToCFS }
  | { type: 'REMOVE', id: EventId };

const eventsReducer = (events: Events | null, action: EventAction): Events => {
  const eventsLast = events || [];

  switch (action.type) {
    case "EMPTY":
      return eventsLast;
    case "ADDED":
      return [...eventsLast, action.event];
    case "MODIFIED":
      return eventsLast.map(event => {
        if (event.id === action.event.id)
          return { ...action.event, id: action.event.id };
        else
          return event;
      });
    case "REMOVED":
      return eventsLast.filter(event => event.id !== action.event.id);
    case "ADD":
      eventsCollection.add(action.event);
      return eventsLast;
    case "MODIFY":
      eventsCollection.doc(action.event.id).set(action.event);
      return eventsLast;
    case "REMOVE":
      eventsCollection.doc(action.id).delete();
      return eventsLast;
    default:
      return eventsLast;
  }
};

export default eventsReducer;