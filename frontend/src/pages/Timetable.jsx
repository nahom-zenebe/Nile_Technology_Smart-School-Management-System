import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';  
import timeGridPlugin from '@fullcalendar/timegrid';  
import interactionPlugin from '@fullcalendar/interaction'; 
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTimetables, addTimetable, removeTimetable, updateTimetable } from "../features/TimeTable";
import "../Styles/Timetable.css"
import TopNavbar from '../components/Topnavbar';
const Timetable = () => {
  const dispatch = useDispatch();
  

  const { Timetables } = useSelector((state) => state.Teacher);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); 

  useEffect(() => {
    dispatch(fetchAllTimetables());
  }, [dispatch]);

  
  const handleEventAdd = (info) => {
    const newEvent = {
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      description: info.event.extendedProps.description,
    };
    dispatch(addTimetable(newEvent)); 
  };

  const handleEventRemove = (info) => {
    dispatch(removeTimetable(info.event.id)); 
  };

  const handleEventUpdate = (info) => {
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      description: info.event.extendedProps.description,
    };
    dispatch(updateTimetable(updatedEvent)); 
  };


  


  const convertToFullCalendarEvent = (timetable) => {
    return {
      id: timetable._id,
      //title: `${timetable.subjectId.name} - ${timetable.teacherId.name}`,
      start: new Date(timetable.startTime),
      end: new Date(timetable.endTime),
     // description: `Class: ${timetable.classId.name}`,
    };
  };

  const events = Timetables?.map(convertToFullCalendarEvent);

  return (
    <div className="block">
        < TopNavbar/>

     

   
      <div  className='m-10'>
        
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
          editable={true}
          droppable={true}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          eventAdd={handleEventAdd}
          eventRemove={handleEventRemove}
          eventChange={handleEventUpdate}
        />
      </div>
    </div>
  );
};

export default Timetable;
