const functions = require("firebase-functions");
const admin = require("firebase-admin");

const {getDiffInMinutes} = require("./utils.js");
const {missedDrug, getDrugs} = require("./services.js");
const serviceAccount = require("./angiovio.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

exports.scheduledFunction = functions.pubsub.schedule("0 * * * *")
	.onRun(async () => {
		try {
			const drugs = await getDrugs();
			checkForNeedToNotufy(drugs);
			checkForMissedDose(drugs);
		} catch(error) {
			console.log("Scheduled function failed", error);
		}
	});

const checkForNeedToNotify = (drugs) => {
	const date = new Date();
	drugs.forEach(element => {
		switch(element.repeats) {
			case 4:
				notifyScenarioFour(date, element);
				break;
			case 3:
				notifyScenarioThree(date, element);
				break;
			case 2:
				notifyScenrioTwo(date, element);
				break;
			case 1: 
				notifyScenarioOne(date, element);
				break;
			default:
				break;
		}
	});
};

const notifyScenarioFour = (date, element) => {
	const hour = date.getHours();
	if(hour === 7) {
		sendNotification(element.user, element.name);
	} else if(hour === 13) {
		sendNotification(element.user, element.name);
	} else if(hour === 19) {
		sendNotification(element.user, element.name);
	} else if(hour === 1) {
		sendNotification(element.user, element.name);
	}
};

const notifyScenarioThree = (date, element) => {
	const hour = date.getHours();
	if(hour === 7) {
		sendNotification(element.user, element.name);
	} else if(hour === 15) {
		sendNotification(element.user, element.name);
	} else if(hour === 23) {
		sendNotification(element.user, element.name);
	}
};

const notifyScenarioTwo = (date, element) => {
	const hour = date.getHours();
	if(hour === 7) {
		sendNotification(element.user, element.name);
	} else if(hour === 19) {
		sendNotification(element.user, element.name);
	}
};

const notifyScenarioOne = (date, element) => {
	const hour = date.getHours();
	if(hour === 7) {
		sendNotification(element.user, element.name);
	}
};

const sendNotification = (token, drug) => {
	const message = {
		data: {
			title: `Please take your prescribed dose of ${drug}`
		},
		token: token
	}
	admin.messaging().send(message);
};

const checkForMissedDose = (drugs) => {
	const date = new Date();
	drugs.forEach(async element => {
		if(element.updatedOn.length === 0 && date,getHours() === 8) {
			await missedDrug(element.user, element.name);
		}else {
			switch(element.repeats) {
				case 4:
					missScenarioFour(date, element);
					break;
				case 3:
					missScenarioThree(date, element);
					break;
				case 2: 
					missScenarioTwo(date, element);
					break;
				case 1:
					missScenarioOne(date, element);
					break;
				default:
					break;
			}
		}
		
	});
};

const missScenarioFour = async (date, element) => {
	const hour = date.getHours();
	const diff = getDiffInMinutes(new Date(element.updatedOn), date);
	if(hour === 8 && diff < 60) {
		await missedDrug(element.user, element.name);
	} else if(hour === 14 && diff < 60) {
		await missedDrug(element.user, element.name);
	} else if(hour === 20 && diff < 60) {
		await missedDrug(element.user, element.name);
	} else if(hour === 2 && diff < 60) {
		await missedDrug(element.user, element.name);
	}
};

const missScenarioThree = async (date, element) => {
	const hour = date.getHours();
	const diff = getDiffInMinutes(new Date(element.updatedOn), date);
	if(hour === 8 && diff < 60) {
		await missedDrug(element.user, element.name);
	} else if(hour === 16 && diff < 60) {
		await missedDrug(element.user, element.name);
	} else if(hour === 0 && diff < 60) {
		await missedDrug(element.user, element.name);
	}
};

const missScenarioTwo = async (date, element) => {
	const hour = date.getHours();
	const diff = getDiffInMinutes(new Date(element.updatedOn), date);
	if(hour === 8 && diff < 60) {
		await missedDrug(element.user, element.name);
	} else if(hour === 20 && diff < 60) {
		await missedDrug(element.user, element.name);
	}
};

const missScenarioOne = async (date, element) => {
	const hour = date.getHours();
	const diff = getDiffInMinutes(new Date(element.updatedOn), date);
	if(hour === 8 && diff < 60) {
		await missedDrug(element.user, element.name);
	}
};



