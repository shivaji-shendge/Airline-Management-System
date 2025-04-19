package com.ss.controller;

import com.ss.entity.CityAirport;
import com.ss.entity.FlightInfo;
import com.ss.service.FlightInfoIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class FlightController {
    @Autowired
    FlightInfoIMPL flightInfoIMPL;

    @PostMapping("/addFlightDetails")
    public String flightInfo(@RequestBody FlightInfo flight) {
        System.out.println("Add Flight details backend api called");
        return flightInfoIMPL.flightInfoAdd(flight);
    }

    @GetMapping("/viewFlights")
    public List<FlightInfo> viewFlights() {
        return flightInfoIMPL.viewFlight();
    }
}