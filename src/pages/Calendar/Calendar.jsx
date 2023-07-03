import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calendar.css';
import useCalendar from '../../store/Calendar';
import { createEventId } from '../../data';

const Calendar = () => {
  const { currentEvents, setCurrentEvents } = useCalendar();

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      setCurrentEvents(JSON.parse(storedEvents));
    }
  }, []);

  const handleEvents = (events) => {
    setCurrentEvents(events);
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Ingrese un título para este evento');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      const updatedEvents = [...currentEvents, newEvent];
      handleEvents(updatedEvents);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (confirm('¿Estás seguro que quieres eliminar este evento?')) {
      clickInfo.event.remove();

      const updatedEvents = currentEvents.filter(
        (event) => event.id !== clickInfo.event.id
      );
      handleEvents(updatedEvents);
    }
  };

  function isNotificationSupported() {
    return 'Notification' in window;
  }

  function showNotification(title) {
    if (isNotificationSupported() && Notification.permission === 'granted') {
      new Notification(title);
    }
  }

  useEffect(() => {
    const currentDate = new Date();
    currentEvents.forEach((event) => {
      const eventDate = new Date(event.start);
      if (eventDate <= currentDate) {
        showNotification(event.title);
      }
    });
  }, [currentEvents]);

  return (
    <div className="calendar-container">
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          allDaySlot={false}
          initialView="timeGridWeek"
          slotDuration="01:00:00"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          initialEvents={currentEvents.map((event) => ({
            ...event,
            id: event.id.toString(),
          }))}
          events={currentEvents.map((event) => ({
            ...event,
            id: event.id.toString(),
          }))}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default Calendar;
