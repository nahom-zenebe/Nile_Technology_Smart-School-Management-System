import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTimetables,
  addTimetable,
  removeTimetable,
  updateTimetable,
} from "../features/TimeTable";
import TopNavbar from "../components/Topnavbar";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Timetable = () => {
  const dispatch = useDispatch();
  const { Timetables, isTimetablesLoading } = useSelector((state) => state.Timetable);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchAllTimetables());
  }, [dispatch]);

  // Handle date click to open modal for new event
  const handleDateClick = (info) => {
    setIsEditMode(false);
    setEventInfo({
      start: info.dateStr,
      end: info.dateStr,
    });
    reset({
      title: "",
      description: "",
      startTime: `${info.dateStr}T09:00`,
      endTime: `${info.dateStr}T10:00`,
    });
    setIsModalOpen(true);
  };

  // Handle event click to edit
  const handleEventClick = (info) => {
    setIsEditMode(true);
    setSelectedEvent(info.event);
    
    const startDate = info.event.start.toISOString().slice(0, 16);
    const endDate = info.event.end ? info.event.end.toISOString().slice(0, 16) : '';
    
    setValue("title", info.event.title);
    setValue("description", info.event.extendedProps.description || "");
    setValue("startTime", startDate);
    setValue("endTime", endDate);
    
    setIsModalOpen(true);
  };

  // Handle form submission
  const onSubmit = (data) => {
    if (isEditMode && selectedEvent) {
      // Update existing event
      const updatedEvent = {
        id: selectedEvent.id,
        updatedData: {
          title: data.title,
          description: data.description,
          startTime: new Date(data.startTime).toISOString(),
          endTime: new Date(data.endTime).toISOString(),
        }
      };
      dispatch(updateTimetable(updatedEvent));
    } else {
      // Create new event
      const newEvent = {
        title: data.title,
        description: data.description,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
      };
      dispatch(addTimetable(newEvent));
    }
    
    setIsModalOpen(false);
    reset();
  };

  // Handle event deletion
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      dispatch(removeTimetable(selectedEvent.id));
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };

  const convertToFullCalendarEvent = (timetable) => {
    return {
      id: timetable._id,
      title: timetable.title || "Untitled Event",
      start: new Date(timetable.startTime),
      end: new Date(timetable.endTime),
      description: timetable.description || "",
      allDay: false,
    };
  };

  const events = Timetables?.map(convertToFullCalendarEvent) || [];

  return (
    <div className="block">
      <TopNavbar />

      <div className="m-5 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Class Timetable</h1>
        
        {isTimetablesLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={events}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
          />
        )}
      </div>

      {/* Modal for adding/editing events */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Event" : "Add New Event"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-2 border rounded"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  {...register("description")}
                  className="w-full p-2 border rounded"
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  {...register("startTime", { required: "Start time is required" })}
                  className="w-full p-2 border rounded"
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">End Time</label>
                <input
                  type="datetime-local"
                  {...register("endTime", { required: "End time is required" })}
                  className="w-full p-2 border rounded"
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>
                )}
              </div>

              <div className="flex justify-between">
                <div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {isEditMode ? "Update" : "Add"}
                  </button>
                </div>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;
