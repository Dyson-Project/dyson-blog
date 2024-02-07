import {format, parseISO} from "date-fns";

export default function Date(args: { dateString: string }) {
    const date = parseISO(args.dateString);
    return <time dateTime={args.dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}