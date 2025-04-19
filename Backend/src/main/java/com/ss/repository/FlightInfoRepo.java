package com.ss.repository;

import com.ss.entity.CityAirport;
import com.ss.entity.FlightInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FlightInfoRepo implements FlightInfoInter  {

    @Autowired
    private JdbcTemplate template;
    @Override
    public String flightInfo(FlightInfo flightinfo) {
        Integer aid = null;
        Integer airId = null;
        int value = 0;
        int val=0;
        int val2=0;
        try{
            String query = "INSERT INTO Airlinename (airline_name) VALUES (?)";
             value = template.update(query,flightinfo.getAirline_name());
        }
        catch (Exception e){
            System.out.println("Inside exception of query for Airlinename table");
            System.out.println(e);
        }
        try{
            String query1 = "SELECT aid FROM Airlinename WHERE airline_name = ?";
             aid = template.queryForObject(query1, new Object[]{flightinfo.getAirline_name()}, Integer.class);
        }
        catch (Exception e){
            System.out.println("Inside exception of query for fetching aid from Airlinename table");
            System.out.println(e);        }

        try {
            String query2="insert into aircraftType(aircra_name) values(?)";
             val=template.update(query2,flightinfo.getAircra_name());
        }
        catch (Exception e){
            System.out.println("Inside exception of query for insert data into aircraftType table");
            System.out.println(e);
        }

        try {
            String query3="select airId from aircraftType where aircra_name=?";
             airId = template.queryForObject(query3, new Object[]{flightinfo.getAircra_name()}, Integer.class);
        }
        catch (Exception e){
            System.out.println("Inside exception of query for fetching airId from aircraftType table");
            System.out.println(e);
        }
        try {
            String query4="insert into flightnumber(fnumber,aid,airId) values(?,?,?)";
             val2=template.update(query4,
                    flightinfo.getFnumber(),aid,airId);
        }
        catch (Exception e){
            System.out.println("Inside exception of query for inserting flightnumber table");
            System.out.println(e);
        }

        if (value > 0 && val>0 && val2>0) {
            return "Flight Info Added Successfully";
        } else {
            return "Flight Info Add Failed";
        }
    }
    @Override
    public List<FlightInfo> viewFlight() {
        String query = "SELECT fl.fid, a.airline_name AS airline_name, air.aircra_name AS aircra_name, fl.fnumber " +
                "FROM flightnumber fl " +
                "INNER JOIN Airlinename a ON a.aid = fl.aid " +
                "INNER JOIN aircraftType air ON air.airid = fl.airid";
        return template.query(query, new BeanPropertyRowMapper<>(FlightInfo.class));
    }
}