package com.ss.service;

import com.ss.entity.City;
import com.ss.entity.CityAirport;
import com.ss.repository.CityNameImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityNameService {
    @Autowired
    CityNameImpl cityName;

    public String addCityAirport(CityAirport airport){
        return cityName.addCityAirport(airport);
    }

    public List<CityAirport> viewCity(){
        return cityName.viewCity();
    }
}