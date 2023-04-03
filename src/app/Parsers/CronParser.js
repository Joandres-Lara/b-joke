import addDays from "date-fns/addDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import setMilliseconds from "date-fns/setMilliseconds";
import pipe from "../util/pipe";

export default class CronParser {
    static REGEXP_MONTHS =
        /(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i;
    static REGEXP_DAYS_OF_WEEK =
        /(lunes|martes|miercoles|jueves|viernes|sabado|domingo)/i;
    static REGEXP_AT_STRING = "a las ([0-9]?[0-9])[:|y]?([0-9]?[0-9]?)";
    static REGEXP_AT = new RegExp(CronParser.REGEXP_AT_STRING, "i");
    static REGEXP_TOMORROW_AT = new RegExp(
        `mañana ${CronParser.REGEXP_AT_STRING} de la (mañana|tarde|noche)`,
        "i"
    );
    /**
     *
     */
    error = null;

    constructor() { }
    /**
     *
     * @param {string} error
     */
    setError(error) {
        this.error = error;
    }

    defaultValues(hours, minutes) {
        hours = Number.parseInt(hours);
        if (!Number.isNaN(Number.parseInt(minutes))) {
            minutes = Number.parseInt(minutes);
        } else {
            minutes = 0;
        }
        return {
            hours,
            minutes,
        };
    }
    /**
     *
     * @returns {string}
     */
    parse(str) {
        const now = new Date();

        let hours, minutes, at;

        if (CronParser.REGEXP_TOMORROW_AT.test(str)) {
            [, hours, minutes, at] = CronParser.REGEXP_TOMORROW_AT.exec(str);
            ({ hours, minutes } = this.defaultValues(hours, minutes));
            return pipe(now)
                .pipe(addDays, 1)
                .pipe(setHours, (at === "tarde" || at === "noche" ? 12 : 0) + hours)
                .pipe(setMinutes, 0)
                .pipe(setSeconds, 0)
                .pipe(setMilliseconds, 0)
                .value()
                .toJSON();
        }

        if (CronParser.REGEXP_AT.test(str)) {
            [, hours, minutes] = CronParser.REGEXP_AT.exec(str);
            ({ hours, minutes } = this.defaultValues(hours, minutes));

            return pipe(now)
                .pipe(setHours, (now.getHours() > 12 ? 12 : 0) + hours)
                .pipe(setMinutes, minutes)
                .pipe(setSeconds, 0)
                .pipe(setMilliseconds, 0)
                .value()
                .toJSON();
        }

        this.setError(`Can't parse ${str}`);
    }
    /**
     *
     * @returns {boolean}
     */
    hasError() {
        return this.error !== null;
    }
    /**
     *
     * @returns {string}
     */
    getError() {
        return this.error instanceof Error ? this.error : new Error(this.error);
    }
    /**
     *
     * @returns {void}
     */
    resetError() {
        this.error = null;
    }
}
