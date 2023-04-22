import moment, { Moment } from 'moment';

export default class DateInstance {
	date: Moment;

	constructor(date: Moment | Date | string | null, format = 'YYYY-MM-DD') {
		this.date = moment(date, format);
	}

	isValid() {
		return this.date.isValid();
	}

	format(...args: []) {
		return this.date.format(...args);
	}
}
