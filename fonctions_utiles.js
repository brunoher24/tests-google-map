function convert2Rad(degree) {
   return degree * Math.PI / 180;
}

function getDistanceBetweenTwoPoints(point1, point2) {
   

	const R = 6371; // Rayon de la Terre en km

	var distanceLatitudes     = convert2Rad(point2.lat   - point1.lat);
	var distanceLongitudes    = convert2Rad(point2.lng   - point1.lng);

	var result 	= 	Math.pow(Math.sin(distanceLongitudes / 2) , 2); 
	result 		*=  Math.cos(convert2Rad(point1.lat));
	result 		*=  Math.cos(convert2Rad(point2.lat));
	result 		+=  Math.pow(Math.sin(distanceLatitudes / 2) ,  2); 
	result 		=   Math.atan2(Math.sqrt(result), Math.sqrt(1-result)) * 2;


	var distance = R * result; // distance entre les deux points en km
	return distance;
}

// les deux paramètre à passer à cette fonction sont de type {lat: ..., lng: ...}

// var dist = getDistanceBetweenTwoPoints({lat:48.8498301, lng: 2.3772704}, {lat: 48.8361965, lng: 2.4790961});

// console.log(dist);


/*------------------Convertir un chiffre de 0 à 5 en étoiles---------------------*/

function getStars(rating) {

    rating = Math.round(rating * 2) / 2;
    let output = '';

    for (var i = rating; i >= 1; i--) {
        output += '<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;';
    }

    if (i == .5) {
        output += '<span style="position:relative">' + 
                    '<i class="fa fa-star" aria-hidden="true" style="color: #ECEDED; position: relative;"></i>' +

                    '<i class="fas fa-star-half" aria-hidden="true" style="color: gold; position: relative; margin-left:-15px;"></i>' +
                  '</span>&nbsp;';
    } 

    for (let i = (5 - rating); i >= 1; i--) {
        output += '<i class="fa fa-star" aria-hidden="true" style="color: #ECEDED;"></i>&nbsp;';
    }

    return output;

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function randomFromInterval(min, max) { // min and max included 
    return Math.random() * (max - min + 1) + min
}

function generateRandomId(nbr=15) {
    let output = "_";
    const chars = "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN0123456789",
    length = chars.length;
    for(let i = 0; i < nbr; i++) {
        output += chars[Math.floor(Math.random() * length)];
    }

    return output;
}


function timestamptToDate(timestamp) {
    const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const date_ = new Date(timestamp);
    const yyyy = date_.getFullYear();
    const mm = date_.getMonth() + 1;
    const dd = DAYS[date_.getDay()];
    return {dd, mm, yyyy};
}

function formatDateToTimeElapsedFrench (timestamp) {
    const backThen = timestamp;
    const now = new Date().getTime();
    const timeElapsedInSecs = (now - backThen) / 1000;
    let backThenMsg = "";

    // < 1min
    if((timeElapsedInSecs) < 60 ) {
        backThenMsg = timeElapsedInSecs % 60 + "sec";
    // < 1H 
    } else if((timeElapsedInSecs) < 60 * 60 ) {
        backThenMsg = Math.floor(timeElapsedInSecs % (60 * 60) / 60) + "min";
    // < 1D 
    } else if((timeElapsedInSecs) < 60 * 60 * 24 ) {
        backThenMsg = Math.floor(timeElapsedInSecs % (60 * 60 * 24) / (60 * 24)) + "h";  
    // < 1Month
    } else if((timeElapsedInSecs) < 60 * 60 * 24 * 30 ) {
        backThenMsg = Math.floor(timeElapsedInSecs % (60 * 60 * 24 * 30) / (60 * 60 * 24)) + " jour(s)";
    // < 1Year
    }  else if((timeElapsedInSecs) < 60 * 60 * 24 * 365) {
        backThenMsg = Math.floor(timeElapsedInSecs % (60 * 60 * 24 * 365) / (60 * 60 * 24 * 30)) + " mois";
    // > 1Year
    } else {
        backThenMsg = Math.floor(timeElapsedInSecs / (60 * 60 * 24 * 365)) + " an(s)";
    }

    return 'Il y a ' + backThenMsg;
}
