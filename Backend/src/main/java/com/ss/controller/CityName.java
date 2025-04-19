package com.ss.controller;

import com.ss.entity.City;
import com.ss.entity.CityAirport;
import com.ss.service.CityNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CityName {
    @Autowired
    CityNameService cityNameService;

    @PostMapping("/addCityAirport")
    public String addCityAirport(@RequestBody CityAirport airport){
        return cityNameService.addCityAirport(airport);
    }

    @GetMapping("/viewAirport")
    public List<CityAirport> viewCity(){
        return cityNameService.viewCity();
    }
}