import { parseISO, format } from 'date-fns';

type Props = {
    dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
    const date = parseISO(dateString);
    console.log("# dateString", dateString, "date", date);
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>;
};

export default DateFormatter;