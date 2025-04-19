package com.ss.repository;

import com.ss.entity.FlightInfo;

import java.util.List;

public interface FlightInfoInter {
    public String flightInfo(FlightInfo flightinfo);
    public List<FlightInfo> viewFlight();
}