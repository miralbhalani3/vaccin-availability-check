// https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=770&date=05-05-2021

const axios = require('axios');
var player = require('play-sound')(opts = {})


var apiA = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=770&date=05-05-2021";

async function searchAPI() {


    var response = await axios.get(apiA);


    var counts = 0;
    var overAllAvailability = false;

    var rData = response.data;

    rData.centers.forEach(center => {
        center.sessions.forEach(session => {
            if (session.min_age_limit == 18 && session.available_capacity > 0) {

                console.log("-");
                console.log("-");
                console.log("-----------");
                if (center.vaccine == "COVAXIN") {
                    console.log("+++++ COVAXIN ++++++");
                }
                console.log("CENTER NAME", center.name);
                console.log("Address", center.address);
                console.log("Date", session.date);
                console.log("Capacity", session.available_capacity);
                console.log("-----------");
                console.log("-");
                console.log("-");

                console.log("AVAILABLE CENTER");
                overAllAvailability = true;
            }

            counts++;
        })
    });


    console.log("TOTAL SEARCHED", counts);

    if (overAllAvailability) {
        console.log("AVAILABLE");

        player.play('a.mp3', function(err) {
            if (err) throw err
        });
    }
}


setInterval(() => {
    searchAPI();

}, 10000);