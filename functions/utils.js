exports.getDiffInMinutes = (date1, date2) => {
	const diffTime = Math.abs(date2 - date1);
	const diffMinutes = Math.round(diffTime / (1000 * 60));
	return diffMinutes;
}

