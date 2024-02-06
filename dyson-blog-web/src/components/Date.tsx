import {format, parseISO} from "date-fns";

interface DateArgument {
    dateString: string
}

export default function Date(args: DateArgument) {
    const date = parseISO(args.dateString);
    return <time dateTime={args.dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}