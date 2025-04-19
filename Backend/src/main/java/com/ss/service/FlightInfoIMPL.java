package com.ss.service;

import com.ss.entity.FlightInfo;
import com.ss.repository.FlightInfoInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightInfoIMPL implements FlightService {

    @Autowired
    private FlightInfoInter flightInfoRepo;

    @Override
    public String flightInfoAdd(FlightInfo flight) {
        return flightInfoRepo.flightInfo(flight);
    }

    @Override
    public List<FlightInfo> viewFlight() {
        return flightInfoRepo.viewFlight();
    }

}