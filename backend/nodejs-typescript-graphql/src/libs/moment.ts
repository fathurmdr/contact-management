import momentLib from "moment-timezone";

momentLib.tz.setDefault("Asia/Jakarta");
momentLib.locale("id");

const moment = momentLib;

export default moment;
