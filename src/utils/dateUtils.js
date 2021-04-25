import moment from 'moment'

export const formatSubDate =(subYear)=> {
    const nowDate=moment().subtract(subYear, 'years').calendar();;
    console.log(nowDate)
    return nowDate;
}

