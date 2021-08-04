const axios = require("axios");

exports.getDrugs = async() => {
	try{
		const { data } = await axios.get("https://angiovio-server-3wyik.ondigitalocean.app/api/alldrugs");
		return parseDrugJson(data);	
	} catch(error){
		throw error;
	}
}

exports.missedDrug = async (user, drug) => {
	try {
		return await axios.put("https://angiovio-server-3wyik.ondigitalocean.app/api/missdrug", {userId: user, name: drug});
	} catch(error) {
		throw error;
	}
}

const parseDrugJson = (data) => {
	const drugs = [];
	data.forEach(element => {
		drugs.push({id: element.id, user: element.userId, dosage: element.dosage, interval: element.interval, missed:element.missed, name: element.name, repeats: element.repeats, taken: element.taken, createdOn: element.createdOn, updatedOn: element.updatedOn})
	});
	return drugs;
}


