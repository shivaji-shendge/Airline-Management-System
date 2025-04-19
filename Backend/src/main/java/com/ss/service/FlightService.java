package com.ss.service;

import com.ss.entity.FlightInfo;

import java.util.List;

public interface FlightService {
    public String flightInfoAdd(FlightInfo flight);
    public List<FlightInfo> viewFlight();
}
