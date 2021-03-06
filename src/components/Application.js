import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

import useApplicationData from "../hooks/useApplicationData";

import "components/Application.scss";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateInterview,
    copyDays,
    addsToSpots,
    editDays
  } = useApplicationData();


  const setAppointments = getAppointmentsForDay(state, state.day);
  const setInterviewers = getInterviewersForDay(state, state.day);
  

  let schedule = setAppointments.map((appointment) => {
    const setInterview = getInterview(state, appointment.interview);
    return(<Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={setInterview}
      interviewers={setInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      updateInterview={updateInterview}
      copyDays={copyDays}
      addsToSpots={addsToSpots}
      editDays={editDays}
    />)
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png"
        alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment 
        key="last" 
        time="5pm" 
        bookInterview={bookInterview} />
      </section>
    </main>
  );
}